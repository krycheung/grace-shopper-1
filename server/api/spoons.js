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

router.get('/:id', async (req, res, next) => {
  const spoonId = req.body.spoodId
  try {
    const spoonRes = await Spoon.findByPk(spoonId)
    res.send(spoonRes.data)
  } catch (err) {
    next(err)
  }
})
