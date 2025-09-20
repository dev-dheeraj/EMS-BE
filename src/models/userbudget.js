'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserBudget extends Model {
    static associate(models) {
      // Belongs to User
      UserBudget.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      // Belongs to Template
      UserBudget.belongsTo(models.Template, {
        foreignKey: 'template_id',
        as: 'template',
      });

      UserBudget.hasMany(models.Expense, {
        foreignKey: 'budget_id',
        as: 'expenses',
      });
    }
  }
  UserBudget.init(
    {
      user_id: DataTypes.UUID,
      template_id: DataTypes.INTEGER,
      total_amount: DataTypes.DECIMAL,
      budget_date: DataTypes.DATEONLY,
      budget_end_date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'UserBudget',
      tableName: 'user_budgets',
      underscored: true,
    }
  );
  return UserBudget;
};
