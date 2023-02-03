const { parse } = require('csv-parse/sync');
const { ServerError } = require('../utils/errors');

const EXTERNAL_API_ROOT = 'http://54.167.46.10';

const companyApiService = {
  /**
   * Fetch CSV data from external API, about a company.
   * @param {string} url 
   */
  getParsedCsvFromURL: async (url) => {
    const csvData = await fetch(url, {
      method: 'GET'
    }).then((response) => response.text());

    const jsObj = parse(csvData, { columns: true });
    return jsObj;
  },

  /**
   * Fetch information about one company with given ID.
   * @param {string} companyId 
   */
  getCompanyDetailsById: async (companyId) => {
    const companyInfo = await fetch(EXTERNAL_API_ROOT + `/company/${companyId}`, {
      method: 'GET'
    }).then(res => res.json());
    return companyInfo;
  },

  /**
   * Get the list of companies and their performance indices in the given sector name.
   * @param {string} sectorName 
   */
  getCompaniesBySector: async (sectorName) => {
    let searchParams = new URLSearchParams();
    searchParams.set('name', sectorName);
    const companySectorInfo = await fetch(EXTERNAL_API_ROOT + `/sector?${searchParams.toString()}`, {
      method: 'GET'
    }).then(res => res.json());
    
    if (companySectorInfo.error !== undefined) {
      throw new ServerError(`Error while interacting with API. Failed to fetch information on sector ${sectorName} - error: ${companySectorInfo.error}.`, 500);
    }

    return companySectorInfo;
  }
};

module.exports = {
  EXTERNAL_API_ROOT,
  companyApiService
};