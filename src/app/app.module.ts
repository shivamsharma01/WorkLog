import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastModule } from "primeng/toast";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputSwitchModule } from "primeng/inputswitch";

import { MessageService } from "primeng/api";

import { DurationPipe } from "./worklog-dashboard/common/duration.pipe";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PickDatasetComponent } from "./pick-dataset/pick-dataset.component";
import { WorklogDashboardComponent } from "./worklog-dashboard/worklog-dashboard.component";
import { HeaderComponent } from "./worklog-dashboard/header/header.component";
import { EntryComponent } from "./worklog-dashboard/common/entry/entry.component";
import { EntryDisplayComponent } from "./worklog-dashboard/common/entry-display/entry-display.component";
import { DialogComponent } from "./worklog-dashboard/common/dialog/dialog.component";
import { ProjectTaskComponent } from "./worklog-dashboard/project-task/project-task.component";
import { DevTaskComponent } from "./worklog-dashboard/project-task/dev-task/dev-task.component";
import { CallTaskComponent } from "./worklog-dashboard/call-task/call-task.component";
import { DiscussionTaskComponent } from "./worklog-dashboard/discussion-task/discussion-task.component";
import { MiscellaneousTaskComponent } from "./worklog-dashboard/miscellaneous-task/miscellaneous-task.component";
import { DocComponent } from "./worklog-dashboard/doc/doc.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PickDatasetComponent,
    WorklogDashboardComponent,
    HeaderComponent,
    DialogComponent,
    EntryComponent,
    EntryDisplayComponent,
    ProjectTaskComponent,
    DevTaskComponent,
    CallTaskComponent,
    DiscussionTaskComponent,
    MiscellaneousTaskComponent,
    DocComponent,
    DurationPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputSwitchModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
