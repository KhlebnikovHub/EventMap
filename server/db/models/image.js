'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
   
    static associate(models) {
      this.belongsTo(models.Event, {foreignKey: 'event_id'})
    }
  };
  Image.init({
    path: DataTypes.TEXT,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
