import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { EsServiceService } from "../service/es-service.service";
import { HttpInterceptorProviders } from "../utils/interceptor/interceptor-providers";

import { SystemManagementRoutingModule } from "./system-management-routing.module";
import { VmsComponent } from "./vms/vms.component";

@NgModule({
  declarations: [VmsComponent],
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EsServiceService, HttpInterceptorProviders],
})
export class SystemManagementModule {}
