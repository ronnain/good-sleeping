import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import bootstrap from './src/main.server';
import { environment } from './src/environments/environment';
import { HOST_ID } from './src/app/host';
import { USER_AGENT } from './src/app/user-agent';


console.log('startJESUISLA');
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  const browserFolder = environment.serverRenderingPath.browserFiles;
  const indexHtml = environment.serverRenderingPath.localIndex;
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: HOST_ID, useValue: req.get('host') + req.originalUrl }, // sending host name in provider
          { provide: USER_AGENT, useValue: req.get('User-Agent') }
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
