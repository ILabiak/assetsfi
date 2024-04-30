'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BinanceKey extends Model {
    static associate(models) {
    }
  }
  BinanceKey.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      apiKey: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      apiSecret: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isTestnet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'BinanceKey',
      tableName: 'bnKeys'
    }
  );
  return BinanceKey;
};
