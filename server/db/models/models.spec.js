/* global describe beforeEach it */

const {expect} = require('chai')
const seed = require('../../../script/seed')
const db = require('../index')
const User = db.model('user')
const Spoon = db.model('spoons')

describe('Spoon and User models', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('user instanceMethods', () => {
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

    describe('user associations', () => {
      it('a user may belong to many spoons', async () => {
        const spoon1 = await Spoon.create({brand: 'IKEA'})
        const spoon2 = await Spoon.create({brand: 'Crate&Barrel'})
        const user = await User.create({
          email: 'spoons@spoonlover.com',
          spoons: 'ilovespoons'
        })
        await user.addSpoons([spoon1, spoon2])
        const userSpoons = await user.getSpoons().map(spoon => spoon.brand)
        expect(userSpoons).to.deep.equal(['IKEA', 'Crate&Barrel'])
      })
    }) // end describe('user associations')

    describe('spoon associations', () => {
      it('a spoon may belong to many users', async () => {
        const user1 = await User.create({
          email: 'theperfectspoon@spoonlover.com',
          spoons: 'spoonsrule'
        })
        const user2 = await User.create({
          email: 's@spoon.com',
          password: 'heyspoon'
        })
        const spoon = await Spoon.create({brand: 'SpoonWorld'})
        await spoon.addUsers([user1, user2])
        const spoonUsers = await spoon.getUsers().map(user => user.email)
        expect(spoonUsers).to.deep.equal([
          'theperfectspoon@spoonlover.com',
          's@spoon.com'
        ])
      })
    }) // end describe ('spoon associations')
  }) // end describe('instanceMethods')

  describe('Seed File', () => {
    let users, spoons
    beforeEach(async () => {
      await seed()
      users = await User.findAll({include: [Spoon]})
      spoons = await Spoon.findAll({include: [User]})
    })

    it('creates at least one user that has no spoons', () => {
      const usersWithNoSpoons = users
        .filter(user => !user.spoons.length)
        .map(user => user.email)
      expect(usersWithNoSpoons).to.have.lengthOf.above(0)
    })

    it('creates at least one spoon that has no users', () => {
      const spoonsWithNoUsers = spoons
        .filter(spoon => !spoon.users.length)
        .map(spoon => spoon.brand)
      expect(spoonsWithNoUsers).to.have.lengthOf.above(0)
    })

    it('creates at least one user that has several spoons', () => {
      const userWithManySpoons = users
        .filter(user => user.spoons.length)
        .map(user => user.email)
      expect(userWithManySpoons).to.have.lengthOf.above(0)
    })

    it('creates at least one spoon that has many users', () => {
      const spoonsWithManyUsers = spoons
        .filter(spoon => spoon.users.length)
        .map(spoon => spoon.brand)
      expect(spoonsWithManyUsers).to.have.lengthOf.above(0)
    })
  })
}) // end describe('User model')
