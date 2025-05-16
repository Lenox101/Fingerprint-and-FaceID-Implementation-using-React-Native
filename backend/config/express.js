const express = require('express');
const cors = require('cors');
require('dotenv').config();

function createExpressApp() {
  const app = express();

  // Enable CORS for all routes
  app.use(cors());

  // Parse JSON request bodies
  app.use(express.json());

  // You can add more global middleware here if needed
  // e.g., app.use(cookieParser());

  return app;
}

module.exports = createExpressApp;
