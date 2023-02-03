'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompanyTag.belongsToMany(models.Company, { through: 'CompanyAndTags' });
    }
  }
  CompanyTag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyTag',
  });
  return CompanyTag;
};