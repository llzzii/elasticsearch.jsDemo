import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInjector } from "./apiInterceptor";
import { CacheInjector } from "./cacheInjector";
import { ErrorInterceptor } from "./errorInterceptor";

// 拦截器数组
export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInjector, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CacheInjector, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
