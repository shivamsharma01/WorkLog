import { Component, OnInit } from "@angular/core";

import { AppService } from "src/app/app.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  spent: number = 0;
  header: string = "";
  done: string;
  rem: string;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.hours.subscribe((duration: number) =>
      this.calculateTime(duration)
    );
    this.service.header.subscribe((header: string) => (this.header = header));
  }

  calculateTime(spent: number) {
    this.spent = spent;
    this.done = this.service.getFormatedTime(spent, false);
    if (spent >= 540) this.rem = "0 Min.";
    else this.rem = this.service.getFormatedTime(540 - spent, false);
  }

  checkTime() {
    if (this.spent < 450) return "red";
    else if (this.spent < 540) return "yellow";
    else return "green";
  }
}
