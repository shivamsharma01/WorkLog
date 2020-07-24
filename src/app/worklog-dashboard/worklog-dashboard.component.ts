import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { AppService } from "../app.service";
import { ActivatedRoute, Router } from "@angular/router";

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
      calls: new FormArray([]),
      discussions: new FormArray([]),
      miscellaneous: new FormArray([]),
    });
    this.service.form = this.form;
    this.router.events.subscribe((e) => {
      console.log(e);
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const cur = params.get("id");
      const relation = this.service.map.get(cur);
      this.service.updateHeader(relation.name);
      this.prev = relation.prev;
      this.next = relation.next;
      this.type =
        this.prev && this.next ? "middle" : this.prev ? "last" : "first";
    });
  }
}
