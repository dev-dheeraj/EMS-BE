'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.hasMany(models.UserSession, { foreignKey: 'user_id' });
    }
  }

  User.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.UUID,
    provider: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    avatar: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return User;
};
