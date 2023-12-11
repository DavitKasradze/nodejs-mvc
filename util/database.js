const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_mvc_db', 'node_mvc_dba' ,'Password123', {
  dialect: 'mysql'
});

module.exports = sequelize;