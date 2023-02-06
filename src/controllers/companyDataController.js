const { getScore } = require('../utils/scoreUtil');
const { companyApiService } = require('../services/companyApiService');
const { companyDbService } = require('../services/dbService');
const { ServerError } = require('../utils/errors');

/**
 * Saves company data by fetching it from another API.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const saveCompanyDataController = async (req, res) => {
  try {
    const companyList = await companyApiService.getParsedCsvFromURL(req.body.urlLink);

    const companyObjs = [];
    const bySector = {};
    const scoreByCompanyId = {};

    for await (const companyIdSector of companyList) {
      if (companyIdSector.company_sector === undefined) {
        throw new ServerError('Bad format of CSV file. Expected a company_sector field, did not find one.', 500);
      }

      const sectorName = companyIdSector.company_sector;
      const companyId = companyIdSector.company_id;

      const companyInfo = await companyApiService.getCompanyDetailsById(companyId);

      if (!(sectorName in bySector)) {
        bySector[sectorName] = await companyApiService.getCompaniesBySector(companyIdSector.company_sector);      
      }
      
      const perfIndex = bySector[sectorName].filter((companyDetail) => companyDetail.companyId == companyId)[0]
        ?.performanceIndex;
      
      if (perfIndex === undefined) {
        throw new ServerError(`Bad format of response received from API. 
        Invalid data for company ID ${companyId} - performanceIndex not found for this company when querying this sector (${sectorName}).`, 500);
      }

      scoreByCompanyId[companyId] = getScore(perfIndex);
      let companyObj = {
        ...companyInfo,
        score: scoreByCompanyId[companyId]
      };
      companyObjs.push(companyObj);

      await companyDbService.add(companyObj);
    }

    res.status(201);

    res.json(companyObjs.map(
      (companyObj) => {
        return {
          id: companyObj.id,
          name: companyObj.name,
          score: companyObj.score
        };
      }
    ));
  } catch(err) {
    res.status(err.code ?? 500);
    res.json({
      error: err.message ?? err ?? 'Something went wrong.'
    });
  }
};

module.exports = { saveCompanyDataController };