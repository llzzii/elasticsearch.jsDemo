import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { NgxEchartsModule } from "ngx-echarts";

import { HomeComponent } from "./home.component";

const homeRoutes: Routes = [{ path: "", component: HomeComponent }];
@NgModule({
  imports: [
    RouterModule,
    RouterModule.forChild(homeRoutes),
    NgxEchartsModule,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomeComponent],
  exports: [],
  providers: [],
})
export class HomeModule {}
