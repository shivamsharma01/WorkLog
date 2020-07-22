import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AppService } from "../app.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-pick-tasks",
  templateUrl: "./pick-tasks.component.html",
  styleUrls: ["./pick-tasks.component.css"],
})
export class PickTasksComponent implements OnInit {
  selectedValues: string[] = [];

  constructor(
    private router: Router,
    private service: AppService,
    private msgS: MessageService
  ) {}

  ngOnInit(): void {
    this.selectedValues = ["Development", "Call", "Discussion"];
  }
  handleClick() {
    if (!this.selectedValues || this.selectedValues.length == 0) {
      this.service.callMessageService("error", "Select At least 1 Task.");
      return;
    }
    this.service.addTasks(this.selectedValues);
    this.router.navigate(["entry-page"]);
  }
}
