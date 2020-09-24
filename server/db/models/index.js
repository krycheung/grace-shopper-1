const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Spoon = require('./spoon')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
const SPOON_ORDER = db.define('SPOON_ORDER', {
  quantity: {
    type: Sequelize.INTEGER
  }
})
Spoon.belongsToMany(Order, {through: SPOON_ORDER})
Order.belongsToMany(Spoon, {through: SPOON_ORDER})
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Spoon,
  Order,
  SPOON_ORDER
}
