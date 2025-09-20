'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Template extends Model {
    static associate(models) {
      // A Template belongs to a User
      Template.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    }
  }
  Template.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      is_global: DataTypes.BOOLEAN,
      is_verified: DataTypes.BOOLEAN,
      created_by: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Template',
      tableName: 'templates',
      underscored: true,
      timestamps: true,
    }
  );
  return Template;
};
