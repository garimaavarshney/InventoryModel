const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const CONST = require('./config/constants');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(3000, function () {
  const url = CONST.MONGO_URL;
  mongoose.connect(url, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Mongo is connected');
  });
});
server.timeout = 1000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Routes configuration
const index = require('./routes/app.routes')(app);

app.listen(`${PORT}`, () => {
  console.log(`Server now listening at localhost:${PORT}`);
});

module.exports = app;
