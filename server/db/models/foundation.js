'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foundation extends Model {
    static associate(models) {
      Foundation.hasMany(models.Donation, {
        foreignKey: 'foundationId'
      });
    }
  }
  Foundation.init(
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
        unique: true
      },
      logoUrl: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Foundation',
      tableName: 'foundations'
    },
  );
  return Foundation;
};
