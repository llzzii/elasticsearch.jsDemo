// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export class Environment {
  static application: Application;
  static production = false;
}

interface Application {
  webDomain: string;
  defaultRegion: string;
  websocketServer: string;
  marketUrl: string;
  productDocument: string;
  filingBook: string;

  redirect_uri: string;
  serviceAPI: string;
  authUrl: string;
  authRealm: string;
  authClientId: string;

  bssFront: string;
  bssAPI: string;

  cloudType: string;
}
