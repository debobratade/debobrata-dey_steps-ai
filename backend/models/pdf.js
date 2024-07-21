const { DataTypes } = require('sequelize');
const { sequelize_connection } = require('../config/sqlConnection');
const { Doctor } = require('./doctorModel');

const PDF = sequelize_connection.define('PDF', {
  pdfid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctorid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'doctorid',
    },
  },
  filepath: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  uploaddate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pdfs',
  timestamps: false,
});

module.exports = { PDF };
