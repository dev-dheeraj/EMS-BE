'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserSession extends Model {
    static associate(models) {
      // One User has many UserSessions
      UserSession.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  UserSession.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_agent: {
      type: DataTypes.STRING
    },
    ip_address: {
      type: DataTypes.STRING
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserSession',
    tableName: 'user_sessions',
    timestamps: true,
    underscored: true
  });

  return UserSession;
};
