import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import * as moment from "moment";

import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { FormGroup, FormArray, AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AppService {
  form: FormGroup;
  hours: BehaviorSubject<number> = new BehaviorSubject(0);
  private _tasks: string[];
  constructor(private messageService: MessageService) {}

  addTasks(tasks: string[]) {
    this._tasks = tasks;
  }

  getTasks() {
    return this._tasks;
  }

  updateTime() {
    let time = 0;
    (this.form.get("tasks") as FormArray).controls.forEach(
      (control: AbstractControl) => {
        time += control.get("time").value;
      }
    );
    this.form.get("totalTime").setValue(time);
    this.hours.next(time);
  }

  calculateDuration(start: NgbTimeStruct, end: NgbTimeStruct) {
    let startMomemt = this.getTime(start);
    let endMomemt = this.getTime(end);
    if (this.validate(startMomemt, endMomemt)) {
      const mins = this.getDuration(startMomemt, endMomemt);
      console.log(mins);
      return this.getFormatedTime(mins, true);
    }
    return "";
  }

  getFormatedTime(mins: number, emitMsg: boolean): string {
    let hr,
      min,
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

  callMessageService(type: string, msg: string) {
    this.messageService.add({
      severity: type,
      summary: type[0].toUpperCase() + type.slice(1) + " Message",
      detail: msg,
    });
  }
}
