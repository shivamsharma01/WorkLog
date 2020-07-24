import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { AccordionModule } from "primeng/accordion";
import { DialogModule } from "primeng/dialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { CarouselModule } from "primeng/carousel";
import { AppComponent } from "./app.component";
import { PickDatasetComponent } from "./pick-dataset/pick-dataset.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { WorklogDashboardComponent } from "./worklog-dashboard/worklog-dashboard.component";
import { HeaderComponent } from "./worklog-dashboard/header/header.component";
import { EntryComponent } from "./worklog-dashboard/common/entry/entry.component";
import { EntryDisplayComponent } from "./worklog-dashboard/common/entry-display/entry-display.component";
import { ProjectTaskComponent } from "./worklog-dashboard/project-task/project-task.component";
import { DevTaskComponent } from "./worklog-dashboard/project-task/dev-task/dev-task.component";
import { DialogComponent } from "./worklog-dashboard/common/dialog/dialog.component";
import { DurationPipe } from "./worklog-dashboard/common/duration.pipe";
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
    DevTaskComponent,
    EntryComponent,
    EntryDisplayComponent,
    ProjectTaskComponent,
    DocComponent,
    DialogComponent,
    DurationPipe,
    CallTaskComponent,
    DiscussionTaskComponent,
    MiscellaneousTaskComponent,
  ],
  imports: [
    BrowserModule,
    ToastModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    AccordionModule,
    InputTextModule,
    InputSwitchModule,
    DialogModule,
    CarouselModule,
    RadioButtonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
