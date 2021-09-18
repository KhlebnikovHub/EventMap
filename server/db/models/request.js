'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "applicant_id",
      });
      this.belongsTo(models.User, {
        foreignKey: "respondent_id",
      });
    }
  };
  Request.init({
    applicant_id: DataTypes.INTEGER,
    respondent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};
