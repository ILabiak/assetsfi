'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      Donation.belongsTo(models.Currency, {
        foreignKey: 'currencyId'
      });
      Donation.belongsTo(models.Foundation, {
        foreignKey: 'foundationId'
      });
    }
  }
  Donation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      foundationId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      currencyId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amountInUsd: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Donation',
      tableName: 'donations'
    }
  );
  return Donation;
};
