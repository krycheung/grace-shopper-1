const router = require('express').Router()
const {Spoon} = require('../db/models')
module.exports = router
const {isAdminMiddleware} = require('../app/authentication-middleware')

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
  const spoonId = req.params.id
  try {
    const spoonRes = await Spoon.findByPk(spoonId)
    res.json(spoonRes)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdminMiddleware, async (req, res, next) => {
  let spoon
  try {
    spoon = await Spoon.create(req.body)
  } catch (err) {
    next(err)
  }
  res.json(spoon)
})

router.delete('/:itemId', isAdminMiddleware, async (req, res, next) => {
  try {
    await Spoon.destroy({
      where: {
        id: req.params.itemId
      }
    })
    const spoons = await Spoon.findAll()
    res.json(spoons)
  } catch (err) {
    next(err)
  }
})

router.put('/:itemId', isAdminMiddleware, async (req, res, next) => {
  let spoon
  try {
    spoon = await Spoon.findByPk(req.params.itemId)
    spoon.update(req.body)
  } catch (err) {
    next(err)
  }
  res.json(spoon)
})
