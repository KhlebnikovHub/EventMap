'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Event,{
        foreignKey:"user_id",
      })
      this.hasMany(models.Place,{
        foreignKey:"user_id",
      })
      this.hasMany(models.Friend,{
        foreignKey:"user_id",
      })
      this.hasMany(models.Friend,{
        foreignKey:"friend_id",
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    avatar: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
