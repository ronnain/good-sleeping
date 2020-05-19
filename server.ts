import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { environment } from 'src/environments/environment';

console.log("init path",  process.cwd());
// ssr DOM
const domino = require('domino');
const fs = require('fs');
const path = require('path');
// index from browser build!
console.log("search index path ",  process.cwd());
//const template = fs.readFileSync(path.join(environment.serverRenderingPath.localIndex, 'index.html')).toString();
const template = fs.readFileSync('../browser/index.html').toString();
console.log("index path find");
// for mock global window by domino
const win = domino.createWindow(template);
// mock
global['window'] = win;
// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

// mock documnet
global['document'] = win.document;
// othres mock
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  console.log("app current path", process.cwd());

  //const distFolder = join(process.cwd(), environment.serverRenderingPath.browserFiles);
  const distFolder = "/home/gero8821/dist/sleeping/browser/";
  console.log("distFolder", distFolder);
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  console.log("indexHtml",indexHtml);

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
/*   server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  })); */
  console.log("All regular routes");
  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = "passenger" || 4000;
  console.log("run current path:",process.cwd());
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

console.log("Before run");

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
console.log("moduleFilename", moduleFilename);
console.log("moduleFilename", __filename);

if (moduleFilename === __filename || moduleFilename.includes('node')) {
  console.log("run start",  process.cwd());
  run();
}

export * from './src/main.server';
