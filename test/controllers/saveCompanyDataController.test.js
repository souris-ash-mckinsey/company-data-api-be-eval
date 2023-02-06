// eslint-disable-next-line no-unused-vars
const sequelize = jest.mock('sequelize');

const { companyApiService } = require('../../src/services/companyApiService');
const { companyDbService } = require('../../src/services/dbService');
const fs = require('fs');
const path = require('path');
const { saveCompanyDataController } = require('../../src/controllers/companyDataController');

describe('Save Company Data Controller', () => {
  //--------------------- Mocks and sample data --------------------------

  const companiesJsonPath = path.join(__dirname, '../../test/resources/sampleCsvParsed.json');
  const companiesParsedObject = JSON.parse(fs.readFileSync(companiesJsonPath));
  
  const companiesBySectorPath = {
    automobile: path.join(__dirname, '../../test/resources/sampleBySectorAutomobile.json'),
    software: path.join(__dirname, '../../test/resources/sampleBySectorSoftware.json')
  };

  const companiesBySector = {
    automobile: JSON.parse(fs.readFileSync(companiesBySectorPath.automobile)),
    software: JSON.parse(fs.readFileSync(companiesBySectorPath.software))
  };

  const companiesByIdPath = path.join(__dirname, '../../test/resources/sampleCompanyInfo.json');
  const companiesById = JSON.parse(fs.readFileSync(companiesByIdPath));

  const getParsedCsvFromURLMock = jest
    .spyOn(companyApiService, 'getParsedCsvFromURL')
    .mockImplementation(() => {})
    .mockResolvedValue(companiesParsedObject);

  const getCompaniesBySectorMock = jest
    .spyOn(companyApiService, 'getCompaniesBySector')
    .mockImplementation((sectorName) => new Promise((resolve) => {
      resolve(sectorName === 'Software' 
        ? companiesBySector.software : companiesBySector.automobile
      );
    }));
  
  const getCompanyDetailsByIdMock = jest
    .spyOn(companyApiService, 'getCompanyDetailsById')
    .mockImplementation((companyId) => new Promise((resolve) => resolve(companiesById[companyId])));

  const companyDbAddMock = jest.spyOn(companyDbService, 'add').mockImplementation(() => {});

  const dummyURL = 'https://store-0001.s3.amazonaws.com/input.csv';
  const dummyReq = {
    body: {
      urlLink: dummyURL
    }
  };

  const dummyRes = {
    json: jest.fn(),
    status: jest.fn()
  };

  // ---------------- End of sample data -------------------

  it('should call getParsedCsvFromURL method of company API service', async () => {
    await saveCompanyDataController(dummyReq, dummyRes);
    expect(getParsedCsvFromURLMock).toBeCalledWith(dummyURL);
  });

  it('should call getCompanyDetailsById method of company API service', async () => {
    await saveCompanyDataController(dummyReq, dummyRes);
    expect(getCompanyDetailsByIdMock).toBeCalled();
  });

  it('should call getCompaniesBySector method of company API service', async () => {
    await saveCompanyDataController(dummyReq, dummyRes);
    expect(getCompaniesBySectorMock).toBeCalled();
  });

  it('should call add method of companyDbService', async () => {
    await saveCompanyDataController(dummyReq, dummyRes);
    expect(companyDbAddMock).toBeCalled();
  });
  
  it('should call response json method', async () => {
    await saveCompanyDataController(dummyReq, dummyRes);
    expect(dummyRes.json).toBeCalled();
  });

  it('should return 201 status in response using response.status method call', async () => {
    await saveCompanyDataController(dummyReq, dummyRes);
    expect(dummyRes.status).toBeCalledWith(201);
  });
});