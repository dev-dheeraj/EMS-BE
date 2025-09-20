'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Categories will later connect with template_categories & expenses
      Category.belongsToMany(models.Template, {
        through: models.TemplateCategory,
        foreignKey: 'category_id',
        otherKey: 'template_id',
        as: 'templates',
      });

      Category.hasMany(models.Expense, {
        foreignKey: 'category_id',
        as: 'expenses',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      underscored: true,
      timestamps: true,
    }
  );
  return Category;
};
