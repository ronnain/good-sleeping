import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import bootstrap from './src/main.server';
import { HOST_ID } from './src/app/host';
import { USER_AGENT } from './src/app/user-agent';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


console.log('startJESUISLA');
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  console.log('app');
  const server = express();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  console.log('serverDistFolder', serverDistFolder);
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  console.log('browserDistFolder', browserDistFolder);
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    console.log('originalUrl', originalUrl);

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl },
        { provide: HOST_ID, useValue: req.get('host') + req.originalUrl }, // sending host name in provider
        { provide: USER_AGENT, useValue: req.get('User-Agent') },
        ]
      })
      .then((html) => {
        res.send(html)
      })
      .catch((err) => {
        console.log('err', err);
        next(err)
      });
  });

  return server;
}

export function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
