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
export class DocComponent implements OnInit {
  constructor(private service: AppService) {}

  ngOnInit(): void {}
  click() {
    //const document: Doc = this.service.form.value;
    const document = {
      totalTime: 540,
      projects: [
        {
          managerName: "Swati  ",
          projectName: "MPB  ",
          tasks: [
            {
              label:
                "worked on Ganesha box changes, rakhi_box branch code merged with new branch",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "137",
                  formattedDuration: "2 Hrs 17 Mins.",
                },
              ],
              time: 137,
            },
            {
              label: "PDP code optimised and committed",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "10",
                  formattedDuration: "10 Mins.",
                },
              ],
              time: 10,
            },
            {
              label:
                "master branch code merged with rakhi_box & build reviewed",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "26",
                  formattedDuration: "26 Mins.",
                },
              ],
              time: 26,
            },
            {
              label: "CB code committed",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "9",
                  formattedDuration: "9 Mins.",
                },
              ],
              time: 9,
            },
            {
              label:
                "Looked into NumberFormatException crash, item click changes done & code optimised",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "57",
                  formattedDuration: "57 Mins.",
                },
              ],
              time: 57,
            },
            {
              label: "Looked into deep link flow on MPB website click",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "35",
                  formattedDuration: "35 Mins.",
                },
              ],
              time: 35,
            },
            {
              label: "Working on new cart view",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "100",
                  formattedDuration: "1 Hr 40 Mins.",
                },
              ],
              time: 100,
            },
          ],
          time: 374,
        },
        {
          projectName: "Ongraviti",
          managerName: "Priyanshu ",
          tasks: [
            {
              label: "build reviewed",
              logTable: [
                {
                  startTime: "-",
                  endTime: "-",
                  duration: "16",
                  formattedDuration: "16 Mins.",
                },
              ],
              time: 16,
            },
          ],
          time: 16,
        },
      ],
      miscellaneous: {
        label: "",
        logTable: [],
        time: 0,
      },
      discussions: {
        label: "",
        logTable: [
          {
            startTime: "-",
            endTime: "-",
            duration: "51",
            formattedDuration: "51 Mins.",
          },
        ],
        time: 51,
      },
      calls: {
        label: "",
        logTable: [
          {
            startTime: "-",
            endTime: "-",
            duration: "39",
            formattedDuration: "39 Mins.",
          },
        ],
        time: 39,
      },
    };

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
      style: BorderStyle.THICK,
    };
    headerStrings = headerStrings.map((cell) => {
      return new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cell,
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        borders: {
          top: prop,
          bottom: prop,
          left: prop,
          right: prop,
        },
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
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
    projects.forEach((project) => {
      rows = rows.concat(this.getProjectRow(project));
    });
    return rows;
  }

  getProjectRow(project: Project): TableRow[] {
    const rows = [];
    const lines = project.tasks.length;
    let row = new TableRow({
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
        //         contextualSpacing: true,
      ],
    });
    rows.push(row);
    for (let i = 1; i < project.tasks.length; i++) {
      row = new TableRow({
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
      });
      rows.push(row);
    }
    return rows;
  }
  getCell(text: string, isFirst: boolean, isLast: boolean): docx.TableCell {
    let border = {};
    if (!isFirst && !isLast) {
      border = {
        bottom: {
          size: 0,
          color: "white",
          style: BorderStyle.THICK,
        },
        top: {
          size: 0,
          color: "white",
          style: BorderStyle.THICK,
        },
      };
    }
    if (!isFirst && isLast) {
      border = {
        top: {
          size: 0,
          color: "white",
          style: BorderStyle.THICK,
        },
      };
    }
    if (!isLast && isFirst) {
      border = {
        bottom: {
          size: 0,
          color: "white",
          style: BorderStyle.THICK,
        },
      };
    }
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
    let rows: TableRow[] = [];
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Break",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              right: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              left: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- " + this.getTime(60),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      })
    );
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Call",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              right: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              left: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- " + this.getTime(Number(document.calls.time)),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      })
    );
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Discussions",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              right: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              left: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      "- " + this.getTime(Number(document.discussions.time)),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              bottom: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      })
    );
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Miscellaneous",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              right: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
              left: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      "- " + this.getTime(Number(document.miscellaneous.time)),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      })
    );
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Total",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              right: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              left: {
                color: "white",
                size: 0,
                style: BorderStyle.THICK,
              },
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "  " + this.getTime(Number(document.totalTime)),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      })
    );
    return rows;
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
export class OtherActivity {
  constructor(public label: string, public time: number) {}
}
