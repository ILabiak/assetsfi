'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    static associate(models) {
      Portfolio.belongsTo(models.Currency, { foreignKey: 'currencyId' });
      Portfolio.hasMany(models.Transaction, {
        foreignKey: 'portfolioId',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Portfolio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      userId: { type: DataTypes.TEXT, allowNull: false },
      title: { type: DataTypes.TEXT, allowNull: false },
      currencyId: { type: DataTypes.INTEGER, allowNull: false },
      visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Portfolio',
      tableName: 'portfolios',
    }
  );
  return Portfolio;
};
