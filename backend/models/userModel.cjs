// user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');


const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false, // If you want timestamps for created_at and updated_at columns
  underscored: true, // Use snake_case for column names
});

module.exports = User;
