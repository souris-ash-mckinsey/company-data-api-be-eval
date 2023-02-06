// eslint-disable-next-line no-unused-vars
const sequelize = jest.mock('sequelize');
const { Company, CompanyTag } = require('../../database/models');
const { companyDbService } = require('../../src/services/dbService');

describe('Company DB interaction', () => {
  describe('add method', () => {
    const dummyCompanyObject = {
      'companyId': '95b5a067-808a-44a9-a490-b4ef8a045f61',
      'name': 'Volkswagen',
      'description': 'Accusantium repudiandae quod deleniti. Perspiciatis asperiores aliquid molestias eligendi dolore ad. Laboriosam cumque maiores est distinctio commodi. Esse repellat sed.',
      'ceo': 'Terrell Luettgen',
      'tags': [
        'visionary',
        'viral',
        'leading-edge',
        'global',
        'virtual',
        'impactful',
        'web-enabled',
        'virtual',
        'next-generation'
      ]
    };

    const dummyCompanyCreateResult = {
      createCompanyTag: jest.fn(),
      addCompanyTag: jest.fn()
    };

    const createMock = jest.spyOn(Company, 'create').mockResolvedValue(
      dummyCompanyCreateResult
    );

    it('should call Company model create method', async () => {
      await companyDbService.add(dummyCompanyObject);
      expect(createMock).toBeCalledWith(dummyCompanyObject);
    });

    it('should call CompanyTag model findOne method', async () => {
      const findOneMock = jest.spyOn(CompanyTag, 'findOne').mockResolvedValue({});

      await companyDbService.add(dummyCompanyObject);
      expect(findOneMock).toBeCalled();
    });

    it('should call addCompanyTag when tag exists', async () => {
      const findOneMock = jest.spyOn(CompanyTag, 'findOne').mockResolvedValue({});

      await companyDbService.add(dummyCompanyObject);
      expect(findOneMock).toBeCalled();
      expect(dummyCompanyCreateResult.addCompanyTag).toBeCalled();
    });

    it('should call createCompanyTag when tag does not exist', async () => {
      const findOneMock = jest.spyOn(CompanyTag, 'findOne').mockResolvedValue(null);

      await companyDbService.add(dummyCompanyObject);
      expect(findOneMock).toBeCalled();
      expect(dummyCompanyCreateResult.createCompanyTag).toBeCalled();
    });
  });
});