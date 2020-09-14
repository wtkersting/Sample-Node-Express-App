const Joi = require('@hapi/joi');
const { ValidationError } = require('@hapi/joi/lib/errors');
const winston = require('../../../../../config/winston');

const schema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  height: Joi.number().required(),
  email: Joi.string().email(),
  favoriteColor: Joi.string()
});

module.exports = async (req, res, next) => {
  try {
    if (req.params.personId !== req.body.id) {
      throw new ValidationError('Path ID must match person object ID');
    }
    
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    winston.error(`Error validating person update: ${err.stack}`);
    res.sendStatus(400);
    return;
  }
};
