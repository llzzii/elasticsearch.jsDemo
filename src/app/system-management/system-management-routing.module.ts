import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VmsComponent } from "./vms/vms.component";

const routes: Routes = [
  { path: "", component: VmsComponent },
  { path: "vms", component: VmsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManagementRoutingModule {}
