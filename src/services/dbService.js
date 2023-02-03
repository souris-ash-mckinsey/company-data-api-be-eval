const { Company, CompanyTag } = require('../../database/models');

const companyDbService = {
  add: async (companyObj) => {
    companyObj['companyId'] = companyObj.id;
    delete companyObj['id'];
    const company = await Company.create(companyObj);

    for (let tag of companyObj.tags) {
      const companyTag = await CompanyTag.findOne({
        where: {
          name: tag
        }
      });

      if (companyTag === null) {
        await company.createCompanyTag({ name: tag });
      }
      else {
        await company.addCompanyTag(companyTag);
      }
    }
  },

  addMany: async (companyObj) => {
    for await (const obj of companyObj) {
      this.companyDbService.add(obj);
    }
  }
};

module.exports = {
  companyDbService
};