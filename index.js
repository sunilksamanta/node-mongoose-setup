require('dotenv').config()

// Initialize DB Connection
require('./config/database');

const {server} = require('./config/server');
const config = require('./config/config').getConfig();
const PORT = config.PORT;

server.listen(PORT, (err) => {
    console.log(`Application running in ${config.MODE} Mode on port ${PORT}`);
});

module.exports = {server};
