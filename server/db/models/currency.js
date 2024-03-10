'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {
      Currency.belongsTo(models.Portfolio, {
        foreignKey: 'currencyId',
        as: 'currency'
      })
    }
  }
  Currency.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      }
    },
    {
      sequelize,
      modelName: 'Currency',
      tableName: 'currencies'
    },
  );
  return Currency;
};
