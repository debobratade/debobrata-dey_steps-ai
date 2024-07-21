const { DataTypes } = require('sequelize');
const { sequelize_connection } = require('../config/sqlConnection');

const Patient = sequelize_connection.define('Patient', {
  patientid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'patients',
  timestamps: false,
});

module.exports = { Patient };
