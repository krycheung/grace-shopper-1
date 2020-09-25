const router = require('express').Router()
const {User, Spoon, Order, SPOON_ORDER} = require('../db/models')

router.put('/cart', async (req, res, next) => {
  let currentCart
  try {
    await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        status: false
      }
    })
    currentCart = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: false
      },
      include: Spoon
    })
    res.json(currentCart)
  } catch (err) {
    next(err)
  }
})

router.get('/history', async (req, res, next) => {
  const userId = req.body.userId
  try {
    let newCart = await Order.create({userId: userId})
    res.json(newCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
