/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Spoon = db.model('spoons')

describe('Api routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users ', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('/api/spoons/', () => {
    beforeEach(() => {
      return Spoon.create({
        brand: 'IKEA'
      })
    })

    it('GET /api/spoons', async () => {
      const res = await request(app)
        .get('/api/spoons')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].brand).to.be.equal('IKEA')
    })
  }) // end describe('/api/spoons')
}) // end describe('User routes')
