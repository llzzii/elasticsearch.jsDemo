import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { EsServiceService } from "../service/es-service.service";
import { HttpInterceptorProviders } from "../utils/interceptor/interceptor-providers";

import { ReportListComponent } from "./report-list/report-list.component";
import { ReportRoutingModule } from "./report-routing.module";
import { DetailComponent } from "./detail/detail.component";
import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
  declarations: [ReportListComponent, DetailComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    NgxEchartsModule,
  ],
  providers: [EsServiceService, HttpInterceptorProviders],
})
export class ReportModule {}
