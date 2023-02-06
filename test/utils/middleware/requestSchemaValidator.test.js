const { requestSchemaValidator } = require('../../../src/utils/middleware/requestSchemaValidator');
const { saveRequestSchema } = require('../../../src/utils/requestSchemas');

describe('Request schema validator', () => {
  describe('for POST /api/save, urlLink is required in the body', () => {
    it('should call next if the body is valid and has a valid urlLink field', async () => {
      const dummyGoodBody = {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      };

      const dummyReq = {
        body: dummyGoodBody,
        method: 'POST'
      };

      const dummyRes = {
        status: jest.fn(),
        json: jest.fn()
      };

      const dummyNext = jest.fn();

      const dummyOptionsPost = {
        'POST': [
          {
            type: 'body',
            schema: saveRequestSchema
          }
        ]
      };

      await (await requestSchemaValidator(dummyOptionsPost))(dummyReq, dummyRes, dummyNext);

      expect(dummyNext).toBeCalled();
    });

    it('should not call next if the body is invalid', async () => {
      const dummyGoodBody = {
        noUrlLinkHere: true
      };

      const dummyReq = {
        body: dummyGoodBody,
        method: 'POST'
      };

      const dummyRes = {
        status: jest.fn(),
        json: jest.fn()
      };

      const dummyNext = jest.fn();

      const dummyOptionsPost = {
        'POST': [
          {
            type: 'body',
            schema: saveRequestSchema
          }
        ]
      };

      await (await requestSchemaValidator(dummyOptionsPost))(dummyReq, dummyRes, dummyNext);

      expect(dummyNext).not.toBeCalled();
    });

    it('should return status 400 and error as json if the body is invalid', async () => {
      const dummyGoodBody = {
        noUrlLinkHere: true
      };

      const dummyReq = {
        body: dummyGoodBody,
        method: 'POST'
      };

      const dummyRes = {
        status: jest.fn(),
        json: jest.fn()
      };

      const dummyNext = jest.fn();

      const dummyOptionsPost = {
        'POST': [
          {
            type: 'body',
            schema: saveRequestSchema
          }
        ]
      };

      await (await requestSchemaValidator(dummyOptionsPost))(dummyReq, dummyRes, dummyNext);

      expect(dummyNext).not.toBeCalled();
      expect(dummyRes.status).toBeCalledWith(400);
      expect(dummyRes.json).toBeCalled();
    });
  });
});