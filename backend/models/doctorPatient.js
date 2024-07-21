const { DataTypes } = require('sequelize');
const { sequelize_connection } = require('../config/sqlConnection');
const { Doctor } = require('./doctorModel');
const { Patient } = require('./patientModel');

const doctorpatient = sequelize_connection.define('doctorpatient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctorid: {
    type: DataTypes.INTEGER,
    references: {
      model: Doctor,
      key: 'doctorid',
    },
  },
  patientid: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'patientid',
    },
  },
}, {
  tableName: 'doctorpatient',
  timestamps: false,
});

module.exports = { doctorpatient };
