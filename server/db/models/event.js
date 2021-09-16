'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Place, {
        foreignKey: "place_id",
      });
      this.hasMany(models.Image, {
        foreignKey:"event_id",
      })

    }
  };
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    private: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
