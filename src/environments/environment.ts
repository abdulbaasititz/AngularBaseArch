// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseURL: 'http://localhost:10002',
  //apiUrl: 'http://0d60-103-88-77-218.ngrok.io/api/v1',
  apiUrl: 'http://localhost:10003/api/v1',
  //apiUrl: 'http://207.180.233.17:10003/api/v1',
  webhookUrl: 'http://localhost:5678/webhook'
};
