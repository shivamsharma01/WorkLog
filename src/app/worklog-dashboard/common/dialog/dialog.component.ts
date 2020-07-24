import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Project } from "../project";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  @Input() type: string;
  @Input() visible: boolean;
  @Input() header: string;
  @Output() detailsEvent = new EventEmitter<Project>();
  @Output() taskEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  public addProject(projectName, managerName) {
    this.detailsEvent.emit(new Project(projectName, managerName));
  }

  close() {
    this.closeEvent.emit(true);
  }

  public addTask(taskName) {
    this.taskEvent.emit(taskName);
  }
}
