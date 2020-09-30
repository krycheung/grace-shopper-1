const router = require('express').Router()
const {User, Spoon, Order, SpoonOrder} = require('../db/models')

// Get User Current Cart:
router.get('/cart', async (req, res, next) => {
  let currentCart
  try {
    await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      },
      include: {
        model: Spoon,
        through: SpoonOrder
      }
    })

    res.json(currentCart)
  } catch (err) {
    next(err)
  }
})

// Get User Order History:
router.get('/history', async (req, res, next) => {
  try {
    let historyResponse = await Order.findAll({
      where: {
        userId: req.user.id,
        status: true
      },
      include: Spoon
    })
    res.json(historyResponse)
  } catch (err) {
    next(err)
  }
})

// Add an item to cart:
router.post('/:itemId', async (req, res, next) => {
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })

    SpoonOrder.create({
      orderId: currentCart.dataValues.id,
      spoonId: req.params.itemId,
      quantity: 1
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// Submit an order:
router.put('/checkout', async (req, res, next) => {
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    currentCart.status = true
    currentCart.save()
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// Update Quantity in Cart:
router.put('/:itemId', async (req, res, next) => {
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })

    let currentLineItem = await SpoonOrder.findOne({
      where: {
        orderId: currentCart.dataValues.id,
        spoonId: req.params.itemId
      }
    })
    currentLineItem.quantity = req.body.newQuantity
    await currentLineItem.save()

    const updatedCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      },
      include: Spoon
    })
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

// Delete item from Cart:
router.delete('/:itemId', async (req, res, next) => {
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    SpoonOrder.destroy({
      where: {
        spoonId: req.params.itemId,
        orderId: currentCart.dataValues.id
      }
    })
    const updatedCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      },
      include: Spoon
    })
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
