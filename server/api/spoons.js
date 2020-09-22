const router = require('express').Router()
const {Spoon} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const spoons = await Spoon.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(spoons)
  } catch (err) {
    next(err)
  }
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
