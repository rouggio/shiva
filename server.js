const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const packageConfig = require('./package.json');

// setup environment variables
if (!process.env.NODE_ENV) {
  console.error("Missing environment variable NODE_ENV!");
  process.exit(1);
}
console.info("Shiva System - NODE_ENV: " + process.env.NODE_ENV);
if (process.env.NODE_ENV == "dev") {
  console.info("dev environment, sourcing params from ./dev.env");
  require('dotenv').config({
    path: path.resolve(__dirname, `./dev.env`)
  });
}

databaseConnection().then(() => {
  setupREST();
});


async function databaseConnection() {
  // database connection
  const db = require('./models');
  console.info("Connecting to the database at url: " + db.url);
  return db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.info("Connected to the database");
    })
    .catch(err => {
      console.info("Cannot connect to the database!", err);
      process.exit();
    });
}

async function setupREST() {
  console.info("Setting up REST endpoints")
  // express contents service
  const app = express();

  // CORS configuration
  const cors = require('cors');
  const { CLIENT_RENEG_WINDOW } = require('tls');
  const { getSystemErrorMap } = require('util');
  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));

  app.use(bodyParser.json());

  // static resources
  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  // api routes
  require('./routes/schedule.routes')(app);

  // anything else goes to frontend home
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/frontend/dist/index.html'));
  });

  // bootstrap
  console.info("starting up: " + packageConfig.name + " " + packageConfig.version);
  app.listen(process.env.PORT, () => {
    console.info("Http server started on port " + process.env.PORT);
  });

}