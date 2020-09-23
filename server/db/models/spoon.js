//many to many relationships for sure
const Sequelize = require('sequelize')
const db = require('../db')

const Spoon = db.define('spoons', {
  brand: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  material: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://static.onecms.io/wp-content/uploads/sites/9/2017/04/kawaii-cute-spoon-appliance-gifts-blog0417.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Spoon
