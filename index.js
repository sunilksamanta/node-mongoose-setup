require('dotenv').config()
console.log('✔ Bootstrapping Application');
// Initialize DB Connection
require('./config/database');

const {server} = require('./config/server');
const config = require('./config/config').getConfig();
const PORT = config.PORT;

server.listen(PORT).on('error', err => {
    console.log('✘ Application failed to start');
    console.error('✘', err.message);
    process.exit(0);
}).on('listening', _ => {
    console.log(`✔ Mode: ${config.MODE}`);
    console.log(`✔ Port: ${PORT}`);
    console.log(`✔ Application Started`);
})


module.exports = {server};
