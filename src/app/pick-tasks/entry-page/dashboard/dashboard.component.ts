import { Component, OnInit } from "@angular/core";

import { AppService } from "src/app/app.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  spent: number = 0;
  done: string;
  rem: string;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.hours.subscribe((d: number) => this.calculateTime(d));
  }

  calculateTime(spent: number) {
    this.spent = spent;
    this.done = this.service.getFormatedTime(spent, false);
    if (spent >= 540) this.rem = "0 Min.";
    else this.rem = this.service.getFormatedTime(540 - spent, false);
    console.log(this.rem);
  }

  checkTime() {
    if (this.spent < 450) return "red";
    else if (this.spent < 540) return "yellow";
    else return "green";
  }
}
