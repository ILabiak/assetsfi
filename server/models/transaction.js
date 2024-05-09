'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Coin, { foreignKey: 'coinId' });
      Transaction.belongsTo(models.Portfolio, { foreignKey: 'portfolioId' });
    }
  }
  Transaction.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      portfolioId: { type: DataTypes.INTEGER, allowNull: false },
      coinId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      amount: { type: DataTypes.DOUBLE, allowNull: false },
      fees: { type: DataTypes.DOUBLE },
      description: { type: DataTypes.TEXT },
      originCurrency: { type: DataTypes.TEXT, allowNull: false },
      costPerUnitInUsd: { type: DataTypes.DOUBLE, allowNull: false },
      costPerUnitInCurrency: { type: DataTypes.DOUBLE, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
    }
  );
  return Transaction;
};
