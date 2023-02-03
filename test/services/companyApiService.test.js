const { companyApiService } = require('../../src/services/companyApiService');
const csvParseSync = require('csv-parse/sync');

describe('External Company API interaction service', () => {
  it('calls fetch when retrieveCsv is called with URL', async () => {
    const dummyURL = '';
    const fetchSpy = jest.fn();
    await companyApiService.retrieveCsvData(dummyURL);
    expect(fetchSpy).toBeCalled();
  });

  it('parses returned text as csv', async () => {
    const dummyURL = '';
    const parseSpy = jest.spyOn(csvParseSync, 'parse');
    await companyApiService.retrieveCsvData(dummyURL);
    expect(parseSpy).toBeCalled();
  });
});