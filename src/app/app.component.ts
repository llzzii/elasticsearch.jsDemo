import { Component, OnInit } from "@angular/core";
import { NzI18nService, en_US, zh_CN } from "ng-zorro-antd";

import { Environment } from "../environments/environment";

import { EsServiceService } from "./service/es-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  language = ";";
  constructor(
    private nzI18nService: NzI18nService,
    private esServiceService: EsServiceService
  ) {}

  switchLanguage(lang) {
    if (lang === "en") {
      this.nzI18nService.setLocale(en_US);
    } else {
      this.nzI18nService.setLocale(zh_CN);
    }
  }

  ngOnInit() {
    this.switchLanguage(this.language);

    this.esServiceService.isAvailable();
  }
}
