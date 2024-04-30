'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    static associate(models) {}
  }
  Coin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      symbol: {
        type: DataTypes.TEXT,
      },
      provider: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Coin',
      tableName: 'coins'
    }
  );
  return Coin;
};
