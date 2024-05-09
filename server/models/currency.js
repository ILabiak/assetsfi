'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {}
  }
  Currency.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: DataTypes.TEXT, allowNull: false, unique: true },
      code: { type: DataTypes.TEXT, allowNull: false, unique: true },
      symbol: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Currency',
      tableName: 'currencies',
    }
  );
  return Currency;
};
