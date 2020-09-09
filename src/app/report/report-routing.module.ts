import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DetailComponent } from "./detail/detail.component";
import { ReportListComponent } from "./report-list/report-list.component";

const routes: Routes = [
  { path: ":id", component: DetailComponent },
  { path: "", component: ReportListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
