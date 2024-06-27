import app from './app';
import { config } from './config';
import logger from './shared/utils/logger';

const port = config.port;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});