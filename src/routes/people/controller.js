const express = require('express');
const router = express.Router();

const winston = require('../../../config/winston');

const personController = require('./person/controller');

const peopleService = require('./service');

router.use('/person', personController);

/**
 * Base route gets and returns all people
 */
router.get('/', async (req, res) => {
  winston.info('Getting all people');
  try {
    const people = await peopleService.getAllPeople();
  
    res.send({
      people: people
    }).status(200);
  } catch (err) {
    winston.error(`Error getting all people: ${err.stack}`);
    res.sendStatus(500);
  }
});

module.exports = router;
