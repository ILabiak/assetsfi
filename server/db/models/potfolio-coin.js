'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PortfolioCoin extends Model {
    static associate(models) {
    }
  }
  PortfolioCoin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      averagePrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'PortfolioCoin',
    },
  );
  return PortfolioCoin;
};
