import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import { Environment } from "../environments/environment";

export function initializer() {}

@Injectable()
export class AppConfig {
  private router: Router;

  constructor() {}
}
