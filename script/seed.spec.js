'use strict'
/* global describe it */
const {expect} = require('chai')
const db = require('../server/db/index')
const User = db.model('user')
const Spoon = db.model('spoons')
const Order = db.model('orders')
const seed = require('./seed')

describe('Seed File', () => {
  let users, spoons, orders
  beforeEach(async () => {
    await seed()
    users = await User.findAll({include: [Order]})
    spoons = await Spoon.findAll({include: [Order]})
    orders = await Order.findAll({include: [Spoon, User]})
  })

  it('populates the database with at least fifteen spoons', async () => {
    const seedSpoons = await Spoon.findAll()
    expect(seedSpoons).to.have.lengthOf.at.least(15)
  })

  it('creates at least one user that has no orders', () => {
    const usersWithNoOrders = users
      .filter(user => !user.orders.length)
      .map(user => user.email)
    expect(usersWithNoOrders).to.have.lengthOf.above(0)
  })

  it('creates at least one spoon that has no orders', () => {
    const spoonsWithNoOrders = spoons
      .filter(spoon => !spoon.orders.length)
      .map(spoon => spoon.brand)
    expect(spoonsWithNoOrders).to.have.lengthOf.above(0)
  })

  it('creates at least one user that has several orders', () => {
    const userWithManyOrders = users
      .filter(user => user.orders.length)
      .map(user => user.email)
    expect(userWithManyOrders).to.have.lengthOf.above(0)
  })

  it('creates at least one spoon that has many orders', () => {
    const spoonsWithManyOrders = spoons
      .filter(spoon => spoon.orders.length)
      .map(spoon => spoon.brand)
    expect(spoonsWithManyOrders).to.have.lengthOf.above(0)
  })

  it('creates at least one order that has many spoons', () => {
    const orderWithManySpoons = orders
      .filter(order => order.spoons.length)
      .map(order => order.status)
    expect(orderWithManySpoons).to.have.lengthOf.above(0)
  })
})
