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

router.post('/', async (req, res, next) => {
  try {
    const spoon = await Spoon.create(req.body)
  } catch (err) {
    next(err)
  }
  res.json(spoon)
})

router.get('/:id', async (req, res, next) => {
  const spoonId = req.params.id
  try {
    const spoonRes = await Spoon.findByPk(spoonId)
    res.send(spoonRes.dataValues)
  } catch (err) {
    next(err)
  }
})
