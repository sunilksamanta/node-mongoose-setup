const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const cors = require('cors');
const corsOptions = {
  origin: "*"
};
server.use(cors(corsOptions));

server.use(bodyParser.json());
const {setRoutes} = require("./routes");
setRoutes(server);
module.exports = { server };
