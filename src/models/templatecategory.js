'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TemplateCategory extends Model {
    static associate(models) {
      // Belongs to Template
      TemplateCategory.belongsTo(models.Template, {
        foreignKey: 'template_id',
        as: 'template',
      });

      // Belongs to Category
      TemplateCategory.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  TemplateCategory.init(
    {
      template_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      percentage: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TemplateCategory',
      tableName: 'template_categories',
      underscored: true,
      timestamps: true,
    }
  );
  return TemplateCategory;
};
