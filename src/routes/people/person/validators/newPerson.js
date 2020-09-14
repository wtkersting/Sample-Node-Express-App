const Joi = require('@hapi/joi');
const winston = require('../../../../../config/winston');

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  height: Joi.number().required(),
  email: Joi.string().email(),
  favoriteColor: Joi.string()
});

module.exports = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    winston.error(`Error validating new person: ${err.stack}`);
    res.sendStatus(400);
    return;
  }
};
