'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrackedAddress extends Model {
    static associate(models) {
      TrackedAddress.belongsTo(models.Currency, { foreignKey: 'currencyId' });
      TrackedAddress.belongsTo(models.SupportedNetwork, {
        foreignKey: 'networkId',
      });
    }
  }
  TrackedAddress.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.TEXT, allowNull: false },
      name: { type: DataTypes.TEXT },
      networkId: { type: DataTypes.INTEGER, allowNull: false },
      address: { type: DataTypes.TEXT, allowNull: false },
      targetAmount: { type: DataTypes.DOUBLE },
      currencyId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'TrackedAddress',
      tableName: 'trackedAddresses',
    }
  );
  return TrackedAddress;
};
