const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');
const User = require('../models/userModel.cjs');

const PeriodTracker = sequelize.define('period_tracker', {
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
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lmd: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'period_tracker',
  timestamps: false, 
  underscored: true, 
});

// Define association between PeriodTracker and User models
//PeriodTracker.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// OR, if you want a one-to-many association (one User has many PeriodTracker)
User.hasMany(PeriodTracker, { foreignKey: 'user_id', as: 'periodTrackers' });

module.exports = PeriodTracker;
