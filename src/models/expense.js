'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      // Belongs to User
      Expense.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      // Belongs to Budget
      Expense.belongsTo(models.UserBudget, {
        foreignKey: 'budget_id',
        as: 'budget',
      });

      // Belongs to Category
      Expense.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  Expense.init(
    {
      user_id: DataTypes.UUID,
      budget_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      expense_date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Expense',
      tableName: 'expenses',
      underscored: true,
      timestamps: true,
    }
  );
  return Expense;
};
