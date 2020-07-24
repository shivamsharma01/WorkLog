import { Component, OnInit } from "@angular/core";
import { Project } from "../common/project";
import { AppService } from "src/app/app.service";
import { FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: "app-project-task",
  templateUrl: "./project-task.component.html",
  styleUrls: ["./project-task.component.css"],
})
export class ProjectTaskComponent implements OnInit {
  displayDialog: boolean;
  form: FormGroup;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.form = this.service.form;
    this.displayDialog = !this.projects.controls.length;
  }

  public closeProject(event: boolean) {
    this.displayDialog = false;
  }

  public addProject(event: Project) {
    let projectName = event.pName,
      managerName = event.mName;
    if (!this.service.ValidateProjectAndManager(projectName, managerName)) {
      return;
    }
    let form = this.service.getNewProjectForm(projectName, managerName);
    this.service.addProject(form);
    this.displayDialog = false;
  }

  get projects(): FormArray {
    return this.service.projects;
  }
}
