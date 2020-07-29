import { Component } from "@angular/core";
import * as docx from "docx";
import { saveAs } from "file-saver";
import {
  TableRow,
  Paragraph,
  TableCell,
  VerticalAlign,
  TextRun,
  AlignmentType,
  Table,
  WidthType,
  BorderStyle,
  HeightRule,
} from "docx";
import { AppService } from "src/app/app.service";
@Component({
  selector: "app-doc",
  templateUrl: "./doc.component.html",
  styleUrls: ["./doc.component.css"],
})
export class DocComponent {
  constructor(private service: AppService) {}

  click() {
    const document: Doc = this.service.form.value,
      doc = new docx.Document(),
      table = new Table({
        rows: [
          this.getTopRow(),
          ...this.getProjectRows(document.projects),
          ...this.getOtherRows(document),
        ],
      });

    doc.addSection({
      children: [table],
    });

    this.save(doc);
  }

  getTopRow(): TableRow {
    return new TableRow({
      children: ["Reporting Manager", "Project", "Task Details", "Hours"].map(
        (cell) => {
          return this.getPara(cell, true, false, false, false, false);
        }
      ),
    });
  }

  getProjectRows(projects: Project[]): TableRow[] {
    let rows = [];
    projects.forEach((project) => {
      rows = rows.concat(this.getProjectRow(project));
    });
    return rows;
  }

  getProjectRow(project: Project): TableRow[] {
    const rows = [],
      lines = project.tasks.length;
    let row;
    rows.push(
      new TableRow({
        height: {
          height: 500,
          rule: HeightRule.AUTO,
        },
        children: [
          this.getCell(project.managerName, true, 1 === lines),
          this.getCell(project.projectName, true, 1 === lines),
          this.getCell("- " + project.tasks[0].label, true, 1 === lines),
          this.getCell(
            "- " + this.getTime(Number(project.tasks[0].time)),
            true,
            1 === lines
          ),
        ],
      })
    );
    for (let i = 1; i < project.tasks.length; i++) {
      row.push(
        new TableRow({
          height: {
            height: 500,
            rule: HeightRule.AUTO,
          },
          children: [
            this.getCell("", false, i + 1 === lines),
            this.getCell("", false, i + 1 === lines),
            this.getCell("- " + project.tasks[i].label, false, i + 1 === lines),
            this.getCell(
              "- " + this.getTime(Number(project.tasks[i].time)),
              false,
              i + 1 === lines
            ),
          ],
        })
      );
    }
    return rows;
  }

  getCell(text: string, isFirst: boolean, isLast: boolean): docx.TableCell {
    const prop = {
      size: 0,
      color: "white",
      style: BorderStyle.THICK,
    };
    let border = {};
    if (!isFirst) border = Object.assign(border, { top: prop });
    if (!isLast) border = Object.assign(border, { bottom: prop });
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: text,
              style: AlignmentType.CENTER,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
      borders: border,
    });
  }

  getTime(time: number) {
    const hr: string = "" + ~~(time / 60),
      mins: string =
        time % 60 == 0
          ? "00"
          : time % 60 < 10
          ? "0" + (time % 60)
          : "" + (time % 60);
    return hr + "." + mins;
  }

  getOtherRows(document: Doc): TableRow[] {
    return [
      new TableRow({
        children: [
          this.getPara("- Break", false, false, false, true, false),
          this.getPara("", false, false, true, true, false),
          this.getPara("", false, false, false, true, true),
          this.getPara(
            "- " + this.getTime(60),
            false,
            false,
            false,
            true,
            false
          ),
        ],
      }),
      new TableRow({
        children: [
          this.getPara("- Call", false, true, false, true, false),
          this.getPara("", false, true, true, true, false),
          this.getPara("", false, true, false, true, true),
          this.getPara(
            "- " + this.getTime(Number(document.calls.time)),
            false,
            true,
            false,
            true,
            false
          ),
        ],
      }),
      new TableRow({
        children: [
          this.getPara("- Discussions", false, true, false, true, false),
          this.getPara("", false, true, true, true, false),
          this.getPara("", false, true, false, true, true),
          this.getPara(
            "- " + this.getTime(Number(document.discussions.time)),
            false,
            true,
            false,
            true,
            false
          ),
        ],
      }),
      new TableRow({
        children: [
          this.getPara("- Miscellaneous", false, true, false, false, false),
          this.getPara("", false, true, true, false, false),
          this.getPara("", false, true, false, false, true),
          this.getPara(
            "- " + this.getTime(Number(document.miscellaneous.time)),
            false,
            true,
            false,
            false,
            false
          ),
        ],
      }),
      new TableRow({
        children: [
          this.getPara("Total", true, false, false, false, false),
          this.getPara("", false, false, true, false, false),
          this.getPara("", false, false, false, false, true),
          this.getPara(
            "- " + this.getTime(Number(document.totalTime)),
            true,
            false,
            false,
            false,
            false
          ),
        ],
      }),
    ];
  }

  getPara(
    text: string,
    bold: boolean,
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean
  ): TableCell {
    const prop = {
      color: "white",
      size: 0,
      style: BorderStyle.THICK,
    };
    let border = {},
      textRun = {};
    textRun = Object.assign(bold, { text });
    if (bold) textRun = Object.assign(textRun, { bold: true });
    if (top) border = Object.assign(border, { top: prop });
    if (right) border = Object.assign(border, { right: prop });
    if (bottom) border = Object.assign(border, { bottom: prop });
    if (left) border = Object.assign(border, { left: prop });
    return new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun(textRun)],
          alignment: AlignmentType.CENTER,
        }),
      ],
      borders: border,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      verticalAlign: VerticalAlign.CENTER,
    });
  }

  save(doc: docx.File) {
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}

export class Doc {
  totalTime: number;
  projects: Project[];
  calls: Task;
  discussions: Task;
  miscellaneous: Task;
}

export class Activity {
  startTime: string;
  endTime: string;
  duration: string;
  formattedDuration: string;
}

export class Task {
  label: string;
  logTable: Activity[];
  time: number;
}

export class Project {
  projectName: string;
  managerName: string;
  tasks: Task[];
  time: number;
}
