import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { CardModule } from "primeng/card";
import { AccordionModule } from "primeng/accordion";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PickTasksComponent } from "./pick-tasks/pick-tasks.component";
import { PickDatasetComponent } from "./pick-dataset/pick-dataset.component";
import { EntryPageComponent } from "./pick-tasks/entry-page/entry-page.component";
import { MessageComponent } from "./message/message.component";
import { DashboardComponent } from "./pick-tasks/entry-page/dashboard/dashboard.component";
import { EntryComponent } from "./pick-tasks/entry-page/entry/entry.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PickTasksComponent,
    PickDatasetComponent,
    EntryPageComponent,
    MessageComponent,
    DashboardComponent,
    EntryComponent,
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
    RadioButtonModule,
    ReactiveFormsModule,
    CardModule,
    NgbModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
