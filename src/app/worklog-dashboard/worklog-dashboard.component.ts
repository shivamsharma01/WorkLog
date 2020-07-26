import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { AppService, Relation } from "../app.service";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterEvent,
} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-worklog-dashboard",
  templateUrl: "./worklog-dashboard.component.html",
  styleUrls: ["./worklog-dashboard.component.css"],
})
export class WorklogDashboardComponent implements OnInit {
  form: FormGroup;
  displayDialog: boolean = true;
  prev: string;
  next: string;
  type: string = "first";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AppService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      totalTime: new FormControl(0),
      projects: new FormArray([]),
      calls: new FormGroup({
        logTable: new FormArray([]),
        time: new FormControl(0),
      }),
      discussions: new FormGroup({
        logTable: new FormArray([]),
        time: new FormControl(0),
      }),
      miscellaneous: new FormGroup({
        logTable: new FormArray([]),
        time: new FormControl(0),
      }),
    });
    this.service.form = this.form;
    this.router.events
      .pipe(filter((e, i) => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        this.update(this.getCurrentActivity(e.url));
      });
    this.activatedRoute.paramMap.subscribe((params) => {
      this.update(this.getCurrentActivity(this.router.url));
    });
    this.service.updateTimeAdd(60);
  }

  getCurrentActivity(url: string): Relation {
    let cur = url.substring(url.lastIndexOf("/") + 1);
    return this.service.map.get(cur);
  }

  update(relation: Relation) {
    this.service.updateHeader(relation.name);
    this.prev = relation.prev;
    this.next = relation.next;
    this.type =
      this.prev && this.next ? "middle" : this.prev ? "last" : "first";
  }
}
