// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  GA_TRACKING_ID: null,
  serverConfig : {
    serverURL : "http://localhost:80/sleeping-bs/handleRequest.php",
    articlesPath: "http://localhost:80/sleeping-bs/articles/",
    imgPath: "http://localhost:80/sleeping-bs/img/"
  },
  serverRenderingPath : {
    localIndex : "..\\browser\\index-dev.html",
    browserFiles : "..\\browser\\",
    indexHtmlFile : "index-dev.html",
    abolsutePathPublicHtml: "..\\browser\\",
    port : 4000
  },
  quizz: {
    insomniaSeverityId: 57,
    sahosId: 58,
    horneOstbergId: 1
  }
};
/*
 * For easier debugging in development mode, you can import the folPlowing file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
