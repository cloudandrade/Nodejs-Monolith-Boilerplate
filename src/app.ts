import express from 'express';
import bodyParser from 'body-parser';
import logger from '#shared/utils/logger';
import helloRoutes from '#infra/adapters/http/routes/helloRoutes';
import setupSwagger from './swaggerConfig';

const app = express();

setupSwagger(app);

app.use(bodyParser.json());
app.use('/api', helloRoutes);

app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;