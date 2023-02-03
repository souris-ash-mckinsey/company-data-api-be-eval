const express = require('express');
const companyDataRoute = express.Router();
const { saveCompanyDataController } = require('../controllers/companyDataController');
const { requestSchemaValidator } = require('../utils/middleware/requestSchemaValidator');
const { saveRequestSchema } = require('../utils/requestSchemas');

companyDataRoute.use('/save', requestSchemaValidator({
  'POST': [
    {
      type: 'body',
      schema: saveRequestSchema
    }
  ]
}));

companyDataRoute.post('/save', saveCompanyDataController);

module.exports = { companyDataRoute };