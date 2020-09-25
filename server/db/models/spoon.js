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
  name: {
    type: Sequelize.STRING
  },
  material: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('price') / 100
    }
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
