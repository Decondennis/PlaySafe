const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');
const User = require('../models/userModel.cjs');

const PregnancyTracker = sequelize.define('pregnancy_tracker', {
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
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  lmd: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'pregnancy_tracker',
  timestamps: false, 
  underscored: true, 
});

// Define association between PregnancyTracker and User models
//PregnancyTracker.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// OR, if you want a one-to-many association (one User has many PregnancyTracker)
User.hasMany(PregnancyTracker, { foreignKey: 'user_id', as: 'pregnancyTrackers' });

module.exports = PregnancyTracker;
