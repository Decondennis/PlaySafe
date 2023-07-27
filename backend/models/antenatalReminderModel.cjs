const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');
const User = require('../models/userModel.cjs');

const AntenatalReminder = sequelize.define('antenatal_reminder', {
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
  appointment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'antenatal_reminder',
  timestamps: false, 
  underscored: true, 
});

// Define association between AntenatalReminder and User models
//AntenatalReminder.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// OR, if you want a one-to-many association (one User has many AntenatalReminders)
User.hasMany(AntenatalReminder, { foreignKey: 'user_id', as: 'antenatalReminders' });

module.exports = AntenatalReminder;
