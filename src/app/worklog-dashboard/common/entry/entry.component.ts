import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { NgbTimeAdapter, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbTimeStringAdapter } from "src/app/ngb-time-string-adapter.service";
import { AppService } from "src/app/app.service";
import { Time } from "../time";

@Component({
  selector: "app-entry",
  templateUrl: "./entry.component.html",
  styleUrls: ["./entry.component.css"],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
})
export class EntryComponent implements OnInit {
  start: NgbTimeStruct;
  end: NgbTimeStruct;
  duration: number;
  checked: boolean = false;
  @Input() taskNum: number;
  @Output() timeEmitter = new EventEmitter<Time>();

  constructor(private service: AppService) {}

  ngOnInit(): void {}

  add() {
    if (!this.checked) {
      if (!this.service.validateDuration(this.duration)) {
        return;
      }
      let time = new Time("-", "-", this.duration);
      this.timeEmitter.emit(time);
      this.duration = 0;
      return;
    }
    let start = this.service.getTime(this.start);
    let end = this.service.getTime(this.end);
    if (this.service.validate(start, end)) {
      const duration: any = this.service.getDuration(start, end);
      this.timeEmitter.emit(new Time(start, end, duration));
      this.service.callMessageService(
        duration < 60 ? "warn" : "success",
        "Logged " + duration + (duration == 1 ? " Min." : " Mins.")
      );
    }
  }

  calculateDuration() {
    this.service.calculateDuration(this.start, this.end);
  }
}
