const { Sequelize } = require('sequelize');

const sequelize_connection = new Sequelize('hospital_management', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize_connection };
