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
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120'
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Spoon
