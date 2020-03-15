// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAszcew63isTDG_lZoyzVw7wP9NRz2Exwo",
    authDomain: "sleeping-1a774.firebaseapp.com",
    databaseURL: "https://sleeping-1a774.firebaseio.com",
    projectId: "sleeping-1a774",
    storageBucket: "sleeping-1a774.appspot.com",
    messagingSenderId: "104196420280",
    appId: "1:104196420280:web:d089c8bd55a241f74bba4d",
    measurementId: "G-K8GHT19KPW"
  },
  serverConfig : {
    serverURL : "http://localhost:80/sleeping-bs/handleRequest.php"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
