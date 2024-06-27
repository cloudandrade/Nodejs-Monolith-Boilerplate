const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
  },
  port: process.env.PORT || 3000,
};