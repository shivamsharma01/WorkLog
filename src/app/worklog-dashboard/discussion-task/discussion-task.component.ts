import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormControl } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { Time } from "../common/time";
import { RemoveActivity } from "../common/remove-activity";

@Component({
  selector: "app-discussion-task",
  templateUrl: "./discussion-task.component.html",
  styleUrls: ["./discussion-task.component.css"],
})
export class DiscussionTaskComponent implements OnInit {
  displayDialog: boolean;
  tasks: FormArray;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.tasks = this.service.form.get("discussions") as FormArray;
    this.displayDialog = !this.tasks.controls.length;
  }

  public addTask(taskName) {
    if (!this.service.ValidateTaskName(taskName)) {
      return;
    }
    this.tasks.push(
      new FormGroup({
        label: new FormControl(taskName),
        logTable: new FormArray([]),
        time: new FormControl(0),
      })
    );
    this.displayDialog = false;
  }

  public logTable(taskId: number): FormArray {
    return this.tasks.at(taskId).get("logTable") as FormArray;
  }

  public close(event) {
    this.displayDialog = false;
  }

  public activity(time: Time, i: number) {
    const table = this.logTable(i);
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
    this.tasks
      .at(i)
      .get("time")
      .setValue(
        Number(this.tasks.at(i).get("time").value) + Number(time.duration)
      );
    this.service.updateTimeAdd(time.duration);
  }

  removeActivity(event: RemoveActivity) {
    const activityFormControl = this.logTable(event.taskId).at(
      event.activityId
    );
    const duration = Number(activityFormControl.get("duration").value);
    this.logTable(event.taskId).removeAt(event.activityId);

    const taskTimeFormControl = this.tasks.at(event.taskId).get("time");
    const taskDuration = Number(taskTimeFormControl.value) - duration;
    taskTimeFormControl.setValue(taskDuration);

    this.service.updateTimeRemove(duration);
  }

  removeTask(index: number) {
    const duration = Number(this.tasks.at(index).get("time").value);
    this.tasks.removeAt(index);
    this.service.updateTimeRemove(duration);
  }
}
