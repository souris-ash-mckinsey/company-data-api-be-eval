const express = require('express');
const companyDataRoute = express.Router();
const { saveCompanyDataController } = require('../controllers/companyDataController');

companyDataRoute.post('/save', saveCompanyDataController);

module.exports = { companyDataRoute };