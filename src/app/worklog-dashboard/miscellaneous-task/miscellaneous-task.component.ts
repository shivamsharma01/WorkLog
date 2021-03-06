import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormControl } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { Time } from "../common/time";
import { RemoveActivity } from "../common/remove-activity";

@Component({
  selector: "app-miscellaneous-task",
  templateUrl: "./miscellaneous-task.component.html",
  styleUrls: ["./miscellaneous-task.component.css"],
})
export class MiscellaneousTaskComponent implements OnInit {
  task: FormGroup;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.task = this.service.form.get("miscellaneous") as FormGroup;
  }

  get logTable(): FormArray {
    return this.task.get("logTable") as FormArray;
  }

  public activity(time: Time) {
    const table = this.logTable;
    if (time.startTime === "-")
      table.push(this.service.generateLogForm("-", "-", time.duration));
    else
      table.push(
        this.service.generateLogForm(
          (time.startTime as moment.Moment).format("hh:mm a"),
          (time.endTime as moment.Moment).format("hh:mm a"),
          time.duration
        )
      );
    this.task
      .get("time")
      .setValue(Number(this.task.get("time").value) + Number(time.duration));
    this.service.updateTimeAdd(time.duration);
  }

  removeActivity(event: RemoveActivity) {
    const activityFormControl = this.logTable.at(event.activityId);
    const duration = Number(activityFormControl.get("duration").value);
    this.logTable.removeAt(event.activityId);

    const taskTimeFormControl = this.task.get("time");
    const taskDuration = Number(taskTimeFormControl.value) - duration;
    taskTimeFormControl.setValue(taskDuration);

    this.service.updateTimeRemove(duration);
  }
}
