'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
  
    static associate(models) {
      this.hasMany(models.Event, { foreignKey: 'place_id' })
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  Place.init({
    name: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    address: DataTypes.STRING,
    time_work: DataTypes.STRING,
    site: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};
