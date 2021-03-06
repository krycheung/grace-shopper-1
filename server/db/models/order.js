const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Order
