import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HOST_ID } from 'host';
import { USER_AGENT } from 'user-agent';

// ssr DOM
const domino = require('domino');
const fs = require('fs');
const mcache = require('memory-cache');
// index from browser build!
const template = fs.readFileSync(environment.serverRenderingPath.localIndex).toString();
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

  //const distFolder = join(process.cwd(), environment.serverRenderingPath.browserFiles);

  const browserFolder = environment.serverRenderingPath.browserFiles;
  const indexHtml = environment.serverRenderingPath.localIndex;

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', browserFolder);

  /**
   * Cache page handler
   * @param duration secondes
   * @returns
   */
  var cache = (duration: number) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url;
      if (/\?deleteCache=true/i.test(key)) {
        key = key.replace(/\?deleteCache=true/i, '');
        mcache.del(key);
      }
      let cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
        return;
      } else {
        res.sendResponse = res.send;
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body);
        }
        next();
      }
    }
  }

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser

  // all the following paths works
/*   const staticFolder2 =  __dirname + '/../../../public_html/';
  const staticFolder4 =  __dirname + '/../browser/';
  const staticFolder3 =  '/home/gero8821/public_html/';

  console.info("staticFolder2 ", staticFolder3, '//// file css exist ? ////', fs.existsSync(staticFolder3+'styles.22a7db0f6abba665215b.css'), '//// js ///', fs.existsSync(staticFolder3+'main-es2015.3ebd9a83e0edfea265b4.js'), '/// img ///', fs.existsSync(staticFolder3+'sleeping-bs/img/guide-chambre-ideale-10-conseils/img1/article/m.jpg'));
  console.info("staticFolder3 ", staticFolder3, '//// file css exist ? ////', fs.existsSync(staticFolder3+'styles.22a7db0f6abba665215b.css'), '//// js ///', fs.existsSync(staticFolder3+'main-es2015.3ebd9a83e0edfea265b4.js'), '/// img ///', fs.existsSync(staticFolder3+'sleeping-bs/img/guide-chambre-ideale-10-conseils/img1/article/m.jpg'));
  console.error("staticFolder4 ", staticFolder4, '//// file css exist ? ////', fs.existsSync(staticFolder4+'styles.22a7db0f6abba665215b.css'), '//// js ///', fs.existsSync(staticFolder3+'main-es2015.3ebd9a83e0edfea265b4.js'), '/// img ///', fs.existsSync(staticFolder3+'sleeping-bs/img/guide-chambre-ideale-10-conseils/img1/article/m.jpg'));
 */
  const abolsutePathPublicHtml =  environment.serverRenderingPath.abolsutePathPublicHtml;
   server.get('*.*', express.static(abolsutePathPublicHtml, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  // Add cache for 1 year
  server.get('*', cache(2147483), (req, res) => {
    res.render(indexHtml,
      {
        req,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          { provide: HOST_ID, useValue: req.get('host') + req.originalUrl }, // sending host name in provider
          { provide: USER_AGENT, useValue: req.get('User-Agent') },
        ]
      });
  });

  return server;
}

function run() {
  const port = 4000;
  console.log("port", port);
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.error(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';

if (moduleFilename === __filename || moduleFilename.includes('node')) {
  run();
}

export * from './src/main.server';
