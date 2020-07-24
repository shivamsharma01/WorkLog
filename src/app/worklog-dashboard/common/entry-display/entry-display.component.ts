import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { RemoveActivity } from "../remove-activity";

@Component({
  selector: "app-entry-display",
  templateUrl: "./entry-display.component.html",
  styleUrls: ["./entry-display.component.css"],
})
export class EntryDisplayComponent implements OnInit {
  @Input() taskForm: FormGroup;
  @Input() i: number;
  @Output() removeEmitter = new EventEmitter<RemoveActivity>();
  constructor() {}

  ngOnInit(): void {}

  get table(): FormArray {
    return this.taskForm.get("logTable") as FormArray;
  }
  removeActivity(index: number) {
    this.removeEmitter.emit(new RemoveActivity(this.i, index));
  }
}
