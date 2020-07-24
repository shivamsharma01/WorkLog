import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PickDatasetComponent } from "./pick-dataset/pick-dataset.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { WorklogDashboardComponent } from "./worklog-dashboard/worklog-dashboard.component";
import { ProjectTaskComponent } from "./worklog-dashboard/project-task/project-task.component";
import { CallTaskComponent } from "./worklog-dashboard/call-task/call-task.component";
import { DiscussionTaskComponent } from "./worklog-dashboard/discussion-task/discussion-task.component";
import { MiscellaneousTaskComponent } from "./worklog-dashboard/miscellaneous-task/miscellaneous-task.component";
import { FinalComponent } from "./worklog-dashboard/final/final.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "pick-dataset", component: PickDatasetComponent },
  {
    path: "work-log/:id",
    component: WorklogDashboardComponent,
    children: [
      { path: "dev", component: ProjectTaskComponent },
      { path: "call", component: CallTaskComponent },
      { path: "discussion", component: DiscussionTaskComponent },
      { path: "miscellaneous", component: MiscellaneousTaskComponent },
      { path: "final", component: FinalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
