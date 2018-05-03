//-- SHOUTOUT BallistyxStreams: YOU DA BOMB --//
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const raven = require('./utilities/raven');

if (process.env.NODE_ENV === 'production') {
  raven.instance
    .config(process.env.RAVEN_PATH, { autoBreadcrumbs: true })
    .install();

  // Add raven request handler //
  app.use(raven.instance.requestHandler());

  // Add error handler //
  app.use(raven.instance.errorHandler());
}

// Body Parser //
app.use(bodyParser.json());

// Setup CORS //
app.use(
  cors({
    origin: ['http://localhost:4200', 'https://www.simplealerts.stream'],
    methods: ['OPTIONS', 'GET', 'PUT', 'POST'],
    allowedHeaders: ['content-type', 'Authorization', 'Origin', 'Accept']
  })
);

module.exports = app;
