'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsToMany(models.CompanyTag, { through: 'CompanyAndTags' });
    }
  }
  Company.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    ceo: DataTypes.STRING,
    description: DataTypes.TEXT,
    numberEmployees: DataTypes.BIGINT,
    score: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};