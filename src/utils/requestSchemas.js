const Joi = require('joi');

const saveRequestSchema = Joi.object({
  urlLink: Joi.string().uri().pattern(/.*\.csv/).required()
});

module.exports = {
  saveRequestSchema
};