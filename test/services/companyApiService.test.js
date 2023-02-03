const { companyApiService, EXTERNAL_API_ROOT } = require('../../src/services/companyApiService');
const path = require('path');
const fs = require('fs');

describe('External Company API interaction service', () => {
  describe('Fetching CSV and parsing it', () => {
    const sampleCsvFilePath = path.join(__dirname, '../../test/resources/sampleCsvCompanies.csv');
    const sampleCsvParsedJsonPath = path.join(__dirname, '../../test/resources/sampleCsvParsed.json');
    const sampleCsvText = fs.readFileSync(sampleCsvFilePath).toString();
    const sampleParsedObject = JSON.parse(fs.readFileSync(sampleCsvParsedJsonPath));

    it('should call fetch when retrieveCsv is called with URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => { }).mockResolvedValue(
        {
          text: jest.fn().mockResolvedValue(sampleCsvText)
        }
      );
      const dummyURL = 'https://store-0001.s3.blah.com/input.csv';
      await companyApiService.getParsedCsvFromURL(dummyURL);
      expect(fetchSpy).toBeCalledWith(dummyURL, { method: 'GET' });
    });

    it('should call convert csv to js object', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => { }).mockResolvedValue(
        {
          text: jest.fn().mockResolvedValue(sampleCsvText)
        }
      );
      const dummyURL = 'https://store-0001.s3.blah.com/input.csv';
      const resObj = await companyApiService.getParsedCsvFromURL(dummyURL);
      expect(resObj).toStrictEqual(sampleParsedObject);
    });
  });

  describe('Fetching details of one company', () => {
    const sampleCompanyInfoPath = path.join(__dirname, '../../test/resources/sampleCompanyInfo.json');
    const sampleCompanyInfo = JSON.parse(fs.readFileSync(sampleCompanyInfoPath));
    jest.restoreAllMocks();

    it('should call fetch to get data from external API with GET request and parse json', async () => {
      const dummyCompanyId = '95b5a067-808a-44a9-a490-b4ef8a045f61';
      const dummyURL = EXTERNAL_API_ROOT + `/company/${dummyCompanyId}`;

      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => { }).mockResolvedValue(
        {
          json: jest.fn(() => { }).mockResolvedValue(sampleCompanyInfo)
        }
      );

      const resObj = await companyApiService.getCompanyDetailsById(dummyCompanyId);
      expect(fetchSpy).toBeCalledWith(dummyURL, { method: 'GET' });
      expect(resObj).toStrictEqual(sampleCompanyInfo);
    });
  });

  describe('Fetching companies given a sector', () => {
    const sampleBySectorDataPath = path.join(__dirname, '../../test/resources/sampleBySector.json');
    const sampleBySectorData = JSON.parse(fs.readFileSync(sampleBySectorDataPath));
    jest.restoreAllMocks();

    it('should call fetch with the right URL and convert from json response', async () => {
      const dummySectorName = 'Software';
      let searchParams = new URLSearchParams();
      searchParams.set('name', dummySectorName);
      const dummyURL = EXTERNAL_API_ROOT + `/sector?${searchParams.toString()}`;

      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => { }).mockResolvedValue(
        {
          json: jest.fn(() => { }).mockResolvedValue(sampleBySectorData)
        }
      );

      const resObj = await companyApiService.getCompaniesBySector(dummySectorName);
      expect(fetchSpy).toBeCalledWith(dummyURL, { method: 'GET' });
      expect(resObj).toStrictEqual(sampleBySectorData);
    });
  });
});