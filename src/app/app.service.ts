import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import * as moment from "moment";

import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import {
  FormGroup,
  FormArray,
  AbstractControl,
  FormControl,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AppService {
  form: FormGroup;
  projectList: string[] = [];
  hours: BehaviorSubject<number> = new BehaviorSubject(0);
  header: BehaviorSubject<string> = new BehaviorSubject("");
  map: Map<string, Relation>;

  constructor(private messageService: MessageService) {
    this.initializeRelation();
  }

  initializeRelation() {
    this.map = new Map<string, Relation>();
    this.map.set(
      "dev",
      new Relation("Development Activity", "", "call", true, false)
    );
    this.map.set(
      "call",
      new Relation("Call Activity", "dev", "discussion", false, false)
    );
    this.map.set(
      "discussion",
      new Relation("Discussion Activity", "call", "miscellaneous", false, false)
    );
    this.map.set(
      "miscellaneous",
      new Relation(
        "Miscellaneous Activity",
        "discussion",
        "final",
        false,
        false
      )
    );
    this.map.set(
      "final",
      new Relation("Final Activity", "miscellaneous", "", false, true)
    );
  }

  updateHeader(header: string) {
    this.header.next(header);
  }

  updateTimeAdd(duration: number) {
    const time: number =
      Number(this.form.get("totalTime").value) + Number(duration);
    this.form.get("totalTime").setValue(time);
    this.hours.next(time);
  }

  updateTimeRemove(duration: number) {
    const time: number =
      Number(this.form.get("totalTime").value) - Number(duration);
    this.form.get("totalTime").setValue(time);
    this.hours.next(time);
  }

  updateTimeRemoveProject(index: number) {
    const projectFormGroup = this.projects.at(index) as FormGroup;
    const projectName = projectFormGroup.get("projectName").value;
    const time = Number(projectFormGroup.get("time").value);
    this.projectList = this.projectList.filter((p) => p !== projectName);
    const totatTime = Number(this.form.get("totalTime").value) - time;
    this.form.get("totalTime").setValue(totatTime);
    this.projects.removeAt(index);
    this.hours.next(totatTime);
  }

  calculateDuration(start: NgbTimeStruct, end: NgbTimeStruct) {
    let startMomemt = this.getTime(start);
    let endMomemt = this.getTime(end);
    if (this.validate(startMomemt, endMomemt)) {
      const mins = this.getDuration(startMomemt, endMomemt);
      return this.getFormatedTime(mins, true);
    }
    return "";
  }

  getFormatedTime(mins: number, emitMsg: boolean): string {
    let hr: number,
      min: number,
      msg = "";
    hr = ~~(mins / 60);
    min = mins % 60;
    if (hr == 1) msg = hr + " Hr ";
    else if (hr != 0) msg = hr + " Hrs ";
    if (min == 1) msg += min + " Min.";
    else if (min != 0) msg += min + " Mins.";
    if (emitMsg)
      this.callMessageService(
        mins < 60 ? "warn" : "success",
        "Duration is " + msg
      );
    return msg;
  }

  getTime(time: NgbTimeStruct) {
    return moment(time, [moment.ISO_8601, "HH:mm"]);
  }

  getDuration(start: moment.Moment, end: moment.Moment): number {
    return (end.toDate().getTime() - start.toDate().getTime()) / (1000 * 60);
  }

  callMessageService(type: string, msg: string) {
    this.messageService.add({
      severity: type,
      summary: type[0].toUpperCase() + type.slice(1) + " Message",
      detail: msg,
    });
  }

  validate(start: moment.Moment, end: moment.Moment) {
    if (!start.isValid())
      this.callMessageService("error", "Start Time Is Invalid.");
    else if (!end.isValid())
      this.callMessageService("error", "End Time Is Invalid.");
    else if (end <= start)
      this.callMessageService(
        "error",
        "End Time Should Be Greater Than Start Time."
      );
    else return true;
    return false;
  }

  validateProjectName(projectName): boolean {
    if (!projectName) {
      this.callMessageService("error", "Please Enter A Project Name");
      return false;
    } else if (
      this.projectList.some(
        (project) =>
          project.toLocaleLowerCase() === projectName.toLocaleLowerCase()
      )
    ) {
      this.callMessageService(
        "error",
        `Project With Name '${projectName}' Already Exists.`
      );
      return false;
    }
    return true;
  }

  validateManagerName(managerName): boolean {
    if (!managerName) {
      this.callMessageService("error", "Please Enter Manager Name.");
      return false;
    }
    return true;
  }

  ValidateProjectAndManager(projectName, managerName): boolean {
    if (
      this.validateProjectName(projectName) &&
      this.validateManagerName(managerName)
    ) {
      this.projectList.push(projectName);
      this.callMessageService(
        "success",
        `Project Created With Name '${projectName}'. Reporting Manager is ${managerName}.`
      );
      return true;
    }
    return false;
  }

  ValidateTaskName(taskName: string): boolean {
    if (!taskName) {
      this.callMessageService("error", "Please Enter A Task Name.");
      return false;
    }
    return true;
  }

  validateHour(duration: number): boolean {
    if (isNaN(duration)) {
      this.callMessageService("error", "Please Enter Valid Hour(s).");
      return false;
    }
    return true;
  }

  validateMin(duration: number, hours: number): boolean {
    if (isNaN(duration)) {
      this.callMessageService("error", "Please Enter Valid Min(s)");
      return false;
    } else if (!duration && !hours) {
      this.callMessageService("error", "Time Logged Should Be Greater Than 0.");
      return false;
    }
    return true;
  }

  addProject(form: FormGroup) {
    this.projects.push(form);
  }

  get projects(): FormArray {
    return this.form.get("projects") as FormArray;
  }

  getNewProjectForm(projectName: string, managerName: string): FormGroup {
    return new FormGroup({
      projectName: new FormControl(projectName),
      managerName: new FormControl(managerName),
      tasks: new FormArray([]),
      time: new FormControl(0),
    });
  }

  generateLogForm(start: string, end: string, duration: number) {
    return new FormGroup({
      startTime: new FormControl(start),
      endTime: new FormControl(end),
      duration: new FormControl(duration),
      formattedDuration: new FormControl(this.getFormatedTime(duration, false)),
    });
  }
}

export class Relation {
  constructor(
    public name: string,
    public prev: string,
    public next: string,
    public isFirst: boolean,
    public isLast: boolean
  ) {}
}
