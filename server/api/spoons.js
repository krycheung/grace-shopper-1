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
  // console.log('req.params.id in api singlesp route', req.params.id)
  const spoonId = req.params.id
  try {
    const spoonRes = await Spoon.findByPk(spoonId)
    console.log(
      'spoonRes.dataValues Object in api singlesp route',
      spoonRes.dataValues
    )
    res.send(spoonRes.dataValues)
  } catch (err) {
    next(err)
  }
})
