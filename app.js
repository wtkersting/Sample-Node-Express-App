require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const winston = require('./config/winston');

const peopleController = require('./src/routes/people/controller');

app.use(bodyParser.json({ limit: '1mb' }));

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.sendStatus(500);
  } else {
    next();
  }
});

app.use('/people', peopleController);

app.listen(port, () => {
  winston.info(`Example app listening at http://localhost:${port}`);
});
