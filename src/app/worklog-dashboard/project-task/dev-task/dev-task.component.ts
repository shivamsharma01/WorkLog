import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "src/app/app.service";
import { FormGroup, FormControl, FormArray, Form } from "@angular/forms";
import { Time } from "../../common/time";
import { RemoveActivity } from "../../common/remove-activity";

@Component({
  selector: "app-dev-task",
  templateUrl: "./dev-task.component.html",
  styleUrls: ["./dev-task.component.css"],
})
export class DevTaskComponent implements OnInit {
  projectName: string;
  managerName: string;
  displayDialog: boolean;
  @Input() form: FormGroup;
  @Input() index: number;
  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.projectName = this.form.get("projectName").value;
    this.managerName = this.form.get("managerName").value;
  }

  activity(time: Time, i: number) {
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
    this.form
      .get("time")
      .setValue(Number(this.form.get("time").value) + Number(time.duration));
    this.service.updateTimeAdd(time.duration);
  }

  get tasks(): FormArray {
    return this.form.get("tasks") as FormArray;
  }

  addTask(taskName) {
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

  logTable(taskId: number): FormArray {
    return this.tasks.at(taskId).get("logTable") as FormArray;
  }

  close(event) {
    this.displayDialog = false;
  }

  removeActivity(event: RemoveActivity) {
    const activityFormControl = this.logTable(event.taskId).at(
      event.activityId
    );
    const duration = Number(activityFormControl.get("duration").value);
    this.logTable(event.taskId).removeAt(event.activityId);

    const projectTimeFormControl = this.form.get("time") as FormControl;
    const projectTime = Number(projectTimeFormControl.value) - duration;
    projectTimeFormControl.setValue(projectTime);

    const taskTimeFormControl = this.tasks.at(event.taskId).get("time");
    const taskDuration = Number(taskTimeFormControl.value) - duration;
    taskTimeFormControl.setValue(taskDuration);

    this.service.updateTimeRemove(duration);
  }

  removeTask(index: number) {
    const duration = Number(this.tasks.at(index).get("time").value);
    this.tasks.removeAt(index);

    const projectTimeFormControl = this.form.get("time") as FormControl;
    const projectTime = Number(projectTimeFormControl.value) - duration;
    projectTimeFormControl.setValue(projectTime);

    this.service.updateTimeRemove(duration);
  }

  removeProject() {
    this.service.updateTimeRemoveProject(this.index);
  }
}
