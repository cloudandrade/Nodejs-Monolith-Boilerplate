import mongoose from 'mongoose';
import { config } from '../../../../config';
import logger from '../../../../shared/utils/logger';

mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error.message}`);
});
db.once('open', () => {
  logger.info('Connected to MongoDB');
});

export default mongoose;