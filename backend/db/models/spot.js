'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here, for example:
      // Spot.hasMany(models.Image, { foreignKey: 'spotId' });
    }
  }
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
      },
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });

  return Spot;
};
