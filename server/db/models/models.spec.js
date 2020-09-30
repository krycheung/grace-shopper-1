/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Spoon = db.model('spoons')
const Order = db.model('orders')

describe('Models', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correctPassword', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })

    it('returns true if the password is correct', () => {
      expect(cody.correctPassword('bones')).to.be.equal(true)
    })

    it('returns false if the password is incorrect', () => {
      expect(cody.correctPassword('bonez')).to.be.equal(false)
    })
  }) // end describe('correctPassword')

  describe('Associations', () => {
    describe('user associations', () => {
      it('a user may have many orders', async () => {
        const order1 = await Order.create({status: true})
        const order2 = await Order.create({status: false})
        const user = await User.create({
          email: 'spoons@spoonlover.com',
          spoons: 'ilovespoons'
        })
        await user.addOrders([order1, order2])
        const userOrders = await user.getOrders().map(order => order.status)
        expect(userOrders).to.deep.equal([true, false])
      })
    }) // end describe('user associations')

    describe('spoon associations', () => {
      it('a spoon may have many orders', async () => {
        const order1 = await Order.create({status: true})
        const order2 = await Order.create({status: false})
        const spoon = await Spoon.create({brand: 'SpoonWorld'})
        await spoon.addOrders([order1, order2])
        const spoonOrders = await spoon.getOrders().map(order => order.status)
        expect(spoonOrders).to.deep.equal([true, false])
      })
    }) // end describe ('spoon associations')

    describe('order associations', () => {
      it('an order may have many spoons', async () => {
        const spoon1 = await Spoon.create({brand: 'IKEA'})
        const spoon2 = await Spoon.create({brand: 'Crate&Barrel'})
        const order = await Order.create({status: false})
        await order.addSpoons([spoon1, spoon2])
        const orderSpoons = await order.getSpoons().map(spoon => spoon.brand)
        expect(orderSpoons).to.deep.equal(['IKEA', 'Crate&Barrel'])
      })
    }) // end describe ('order associations')
  }) // end describe('instanceMethods')
}) // end describe('User model')
