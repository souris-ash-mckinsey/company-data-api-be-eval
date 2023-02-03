const { parse } = require('csv-parse/sync');

const EXTERNAL_API_ROOT = 'http://54.167.46.10';

const companyApiService = {
  /**
   * Retrieve CSV data from external API, about a company.
   * @param {string} url 
   */
  getParsedCsvFromURL: async (url) => {
    const csvData = await fetch(url, {
      method: 'GET'
    }).then((response) => response.text());

    return parse(csvData, { columns: true });
  },

  /**
   * Retreive information about one company with given ID.
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
    
    return companySectorInfo;
  }
};

module.exports = {
  EXTERNAL_API_ROOT,
  companyApiService
};