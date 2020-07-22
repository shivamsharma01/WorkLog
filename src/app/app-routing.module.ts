import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PickTasksComponent } from "./pick-tasks/pick-tasks.component";
import { PickDatasetComponent } from "./pick-dataset/pick-dataset.component";
import { EntryPageComponent } from "./pick-tasks/entry-page/entry-page.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "pick-tasks", component: PickTasksComponent },
  { path: "entry-page", component: EntryPageComponent },
  { path: "pick-dataset", component: PickDatasetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
