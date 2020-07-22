import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { NgbTimeAdapter, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbTimeStringAdapter } from "src/app/ngb-time-string-adapter.service";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-entry",
  templateUrl: "./entry.component.html",
  styleUrls: ["./entry.component.css"],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
})
export class EntryComponent implements OnInit {
  start: NgbTimeStruct;
  end: NgbTimeStruct;
  totalTaskTime = "0 Min.";
  logs: { start: string; end: string; duration: string }[] = [];
  @Input() taskForm: FormGroup;

  constructor(private service: AppService) {}

  ngOnInit(): void {}

  add() {
    let start = this.service.getTime(this.start);
    let end = this.service.getTime(this.end);
    if (this.service.validate(start, end)) {
      const duration: any = this.service.getDuration(start, end);
      this.service.callMessageService(
        duration < 60 ? "warn" : "success",
        "Logged " + duration + (duration == 1 ? " Min." : " Mins.")
      );
      this.logs.push({
        start: start.format("hh:mm a"),
        end: end.format("hh:mm a"),
        duration: this.service.getFormatedTime(duration, false),
      });
      this.logTable.push(
        new FormGroup({
          startTime: new FormControl(start.toDate().getTime()),
          endTime: new FormControl(end.toDate().getTime()),
          duration: new FormControl(duration),
        })
      );
      let totalTaskTime = 0;
      this.logTable.controls.forEach((control: AbstractControl) => {
        totalTaskTime += control.get("duration").value;
      });
      this.taskForm.get("time").setValue(totalTaskTime);
      this.totalTaskTime =
        this.service.getFormatedTime(totalTaskTime, false) || "0 Min.";
      this.service.updateTime();
    }
  }
  calculateDuration() {
    this.service.calculateDuration(this.start, this.end);
  }

  get logTable(): FormArray {
    return this.taskForm.get("logTable") as FormArray;
  }
}
