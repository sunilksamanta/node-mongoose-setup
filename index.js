require('dotenv').config()
require('./config/database');
const { server } = require('./config/server');
const config = require('./config/config').getConfig();
const PORT = process.env.PORT || config.PORT;
server.listen(PORT, () => {
  console.log(`Application running in ${config.MODE} Mode on port ${PORT}`);
});
