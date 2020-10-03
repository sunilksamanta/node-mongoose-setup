const mongoose = require("mongoose");
const config = require('./config').getConfig();
class Connection {
  constructor() {
    const url = config.MONGO_URL;
    console.log("Establish new connection with url", url);
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(url, err => {
      console.error('MONGODB CONNECTION ERROR: ', err.message);
    });
  }
}

module.exports = new Connection();
