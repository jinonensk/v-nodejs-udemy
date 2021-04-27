const Sequelize = require('sequelize')

const DB_NAME = process.env.DB_NAME
const USER_NAME = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = sequelize
