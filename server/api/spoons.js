const router = require('express').Router()
const {Spoon} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  let spoons
  try {
    spoons = await Spoon.findAll()
  } catch (err) {
    next(err)
  }
  res.json(spoons)
})
