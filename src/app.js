const express = require('express');
const bodyParser = require('body-parser');
const helloRoutes = require('./infra/adapters/http/routes/helloRoutes');
const AppError = require('./shared/errors/AppError');

const app = express();

app.use(bodyParser.json());
app.use('/api', helloRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;