import { Component, OnInit } from "@angular/core";
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
} from "docx";
import { AppService } from "src/app/app.service";
@Component({
  selector: "app-doc",
  templateUrl: "./doc.component.html",
  styleUrls: ["./doc.component.css"],
})
export class DocComponent implements OnInit {
  constructor(private service: AppService) {}

  ngOnInit(): void {}
  click() {
    const document: Doc = this.service.form.value;
    const doc = new docx.Document();
    const table = new Table({
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
    console.log(document);
  }
  getTopRow(): TableRow {
    let headerStrings: any = [
      "Reporting Manager",
      "Project",
      "Task Details",
      "Hours",
    ];
    const prop = {
      size: 10,
      color: "black",
      style: docx.BorderStyle.THICK,
    };
    headerStrings = headerStrings.map((cell) => {
      return new TableCell({
        children: [new Paragraph(cell)],
        borders: {
          top: prop,
          bottom: prop,
          left: prop,
          right: prop,
        },
        verticalAlign: VerticalAlign.CENTER,
      });
    });
    return new TableRow({
      children: headerStrings,
    });
  }

  getProjectRows(projects: Project[]): TableRow[] {
    let rows = [];
    projects = projects || [];
    rows = projects.map((project) => {
      return this.getProjectRow(project);
    });
    return rows;
  }

  getProjectRow(project: Project) {
    return new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(project.managerName)],
        }),
        new TableCell({
          children: [new Paragraph(project.projectName)],
        }),
        new TableCell({
          children: this.getTasks(project.tasks),
        }),
        new TableCell({
          children: this.getTimes(project.tasks),
        }),
      ],
    });
  }

  getTasks(tasks: Task[]): Paragraph[] {
    const paras = [];
    tasks.forEach((task) => {
      paras.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "- " + task.label,
            }),
          ],
          alignment: AlignmentType.CENTER,
        })
      );
      paras.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
        })
      );
    });
    paras.pop();
    return paras;
  }

  getTimes(tasks: Task[]) {
    const paras = [];
    tasks.forEach((task) => {
      paras.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "- " + this.getTime(Number(task.time)),
            }),
          ],
          alignment: AlignmentType.CENTER,
        })
      );
      paras.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
        })
      );
    });
    paras.pop();
    return paras;
  }
  getTime(time: number) {
    const hr: string = "" + ~~(time / 60);
    const mins: string =
      time % 60 == 0
        ? "00"
        : time % 60 < 10
        ? "0" + (time % 60)
        : "" + (time % 60);
    return hr + "." + mins;
  }

  getOtherRows(document: Doc): TableRow[] {
    let activities: OtherActivity[] = [];
    activities.push(new OtherActivity("- Break", 60));
    activities.push(new OtherActivity("- Calls", Number(document.calls.time)));
    activities.push(
      new OtherActivity("- Discussions", Number(document.discussions.time))
    );
    activities.push(
      new OtherActivity("- Miscellaneous", Number(document.miscellaneous.time))
    );
    activities = activities.filter((a) => a.time);
    return [
      this.getOtherRow(activities),
      this.getOtherRow([new OtherActivity("Total", document.totalTime)]),
    ];
  }

  getOtherRow(activities: OtherActivity[]): TableRow {
    const paras = [];
    activities.forEach((a) => {
      paras.push(
        new Paragraph({
          children: [
            new TextRun({
              text: a.label,
              style: "wellSpaced",
            }),
          ],
          alignment: AlignmentType.CENTER,
        })
      );
      paras.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
        })
      );
    });
    const hours = [];
    activities.forEach((a) => {
      hours.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "- " + this.getTime(a.time),
              style: "wellSpaced",
            }),
          ],
          alignment: AlignmentType.CENTER,
        })
      );
      paras.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
        })
      );
    });
    return new TableRow({
      children: [
        new TableCell({
          children: [...paras],
        }),
        new TableCell({
          children: [],
        }),
        new TableCell({
          children: [],
        }),
        new TableCell({
          children: [...hours],
        }),
      ],
    });
  }

  save(doc: docx.File) {
    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
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
  duration: number;
  formattedDuration: string;
}

export class Task {
  label: string;
  logTable: Activity[];
  time: string;
}

export class Project {
  projectName: string;
  managerName: string;
  tasks: Task[];
  time: number;
}
export class OtherActivity {
  constructor(public label: string, public time: number) {}
}
