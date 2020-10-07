const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const server = express();
server.use(helmet())
const cors = require('cors');
const corsOptions = {
    origin: "*"
};
server.use(cors(corsOptions));

server.use(bodyParser.json());
const {setRoutes} = require("./routes");
setRoutes(server);
module.exports = {server};
