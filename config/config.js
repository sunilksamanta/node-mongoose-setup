'use strict';
const path = require('path');
module.exports.getConfig = () => {
  const config = {
    MODE: 'Development',
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    UPLOAD_PATH: path.resolve(__dirname + '/../uploads')
  }

  // Modify for Production
  if(process.env.NODE_ENV === 'production') {
    config.MODE = 'Production';
  }

  return config;
}
