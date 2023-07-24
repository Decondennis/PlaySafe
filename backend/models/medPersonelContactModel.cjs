// medPersonnelContact.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');
const User = require('./userModel.cjs');

const MedPersonnelContact  = sequelize.define('med_personel_contact', {
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
      model: User, // This is referencing the User model
      key: 'id', // This is referencing the primary key (id) of the User model
    },
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'med_personel_contact',
  timestamps: false, // If you want timestamps for created_at and updated_at columns
  underscored: true, // Use snake_case for column names
});

// Define association between MedPersonnelContact and User models
//MedPersonnelContact.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// OR, if you want a one-to-many association (one User has many MedPersonnelContact)
User.hasMany(MedPersonnelContact, { foreignKey: 'user_id', as: 'medPersonnelContacts' });

module.exports = MedPersonnelContact ;
