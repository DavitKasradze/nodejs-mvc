const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER, //es unda davgooglo ras nishnavs
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = User;
