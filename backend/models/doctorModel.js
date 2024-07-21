const { DataTypes } = require('sequelize');
const { sequelize_connection } = require('../config/sqlConnection');

const Doctor = sequelize_connection.define('Doctor', {
  doctorid: {
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
  specialty: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'doctors',
  timestamps: false,
});

module.exports = { Doctor };
