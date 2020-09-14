const express = require('express');
const router = express.Router();

const winston = require('../../../../config/winston');
const { NotFoundError } = require('../../../helpers/errors');

const personValidator = require('./validators/newPerson');
const personUpdateValidator = require('./validators/personUpdate');
const personService = require('./service');

/**
 * GET route to retrive person from people DB
 */
router.get('/:personId', async (req, res) => {
  winston.info(`Getting person for id ${req.params.personId}`);
  try {
    const person = await personService.getPerson(req.params.personId);

    res.send({
      person: person
    }).status(200);
  } catch (err) {
    if (err instanceof NotFoundError) {
      winston.error('No person found');
      res.sendStatus(404);
    } else {
      winston.error(`Error getting person: ${err.stack}`);
      res.sendStatus(500);
    }
  }
});

/**
 * DELETE route to remove a person from people DB
 */
router.delete('/:personId', async (req, res) => {
  winston.info(`Deleting person with id ${req.params.personId}`);
  try {
    await personService.removePerson(req.params.personId);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof NotFoundError) {
      winston.error('No person found');
      res.sendStatus(404);
    } else {
      winston.error(`Error deleting person: ${err.stack}`);
      res.sendStatus(500);
    }
  }
});

/**
 * POST route to create a new person in people DB
 */
router.post('/', personValidator, async (req, res) => {
  winston.info('Creating new person');
  try {
    const id = await personService.createPerson(req.body);

    winston.info(`New person ${id} created`);
    res.send({
      id: id
    }).status(201);
  } catch (err) {
    winston.error(`Error creating new person: ${err.stack}`);
    res.sendStatus(500);
  }
});

/**
 * PUT route to update an existing person in people DB
 */
router.put('/:personId', personUpdateValidator, async (req, res) => {
  winston.info(`Updating person ${req.params.personId}`);
  try {
    await personService.updatePerson(req.body);

    res.sendStatus(200);
  } catch (err) {
    if (err instanceof NotFoundError) {
      winston.error('No person found');
      res.sendStatus(404);
    } else {
      winston.error(`Error updating person ${req.params.personId}`);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
