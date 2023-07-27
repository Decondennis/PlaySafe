const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');
const User = require('../models/userModel.cjs');

const RemainderSetting = sequelize.define('remainder_setting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User, 
      key: 'id', 
    },
  },
  days_in_adv: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'remainder_settings',
  timestamps: false, 
  underscored: true, 
});

// Define association between RemainderSetting and User models
//RemainderSetting.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// OR, if you want a one-to-many association (one User has many RemainderSetting)
User.hasMany(RemainderSetting, { foreignKey: 'user_id', as: 'remainderSettings' });


module.exports = RemainderSetting;
