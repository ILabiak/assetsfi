'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportedNetwork extends Model {
    static associate(models) {}
  }
  SupportedNetwork.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        unique: true,
      },
      code: {
        type: DataTypes.TEXT,
        unique: true,
      },
      logoUrl: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'SupportedNetwork',
      tableName: 'supportedNetworks',
    }
  );
  return SupportedNetwork;
};
