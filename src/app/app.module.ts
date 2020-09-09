import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { TranslateModule } from "@ngx-translate/core";

import { NgZorroAntdModule } from "ng-zorro-antd";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { DefaultComponent } from "./default/default.component";
import { HttpInterceptorProviders } from "./utils/interceptor/interceptor-providers";
// import { EsServiceService } from "./service/es-service.service";

@NgModule({
  imports: [
    NoopAnimationsModule,
    NgZorroAntdModule,
    TranslateModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AppComponent, DefaultComponent],
  providers: [
    HttpInterceptorProviders,
    // EsServiceService,
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
