import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "app-entry-page",
  templateUrl: "./entry-page.component.html",
  styleUrls: ["./entry-page.component.css"],
})
export class EntryPageComponent implements OnInit {
  form: FormGroup;
  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      totalTime: new FormControl(),
      tasks: new FormArray([]),
    });
    this.service.getTasks().forEach((task) => {
      (this.form.get("tasks") as FormArray).push(
        new FormGroup({
          label: new FormControl(task),
          logTable: new FormArray([]),
          time: new FormControl(0),
        })
      );
    });
    this.service.form = this.form;
  }

  get tasks() {
    return this.form.get("tasks") as FormArray;
  }
}
