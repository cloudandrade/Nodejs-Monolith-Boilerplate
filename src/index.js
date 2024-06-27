const app = require('./app');
const config = require('./config');
const logger = require('./shared/utils/logger');

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});