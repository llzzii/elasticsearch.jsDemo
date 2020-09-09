import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefaultComponent } from "./default/default.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        redirectTo: "/overview",
        pathMatch: "full",
      },
      {
        path: "state",
        redirectTo: "/overview",
        pathMatch: "full",
      },
      {
        path: "overview",
        loadChildren: "./home/home.module#HomeModule",
        data: {
          breadcrumb: "总览",
        },
      },
      {
        path: "system",
        loadChildren:
          "./system-management/system-management.module#SystemManagementModule",
        data: {
          breadcrumb: "系统管理",
        },
      },
      {
        path: "report",
        loadChildren: "./report/report.module#ReportModule",
        data: {
          breadcrumb: "报表中心",
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
