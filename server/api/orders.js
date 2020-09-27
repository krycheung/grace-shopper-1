const router = require('express').Router()
const {User, Spoon, Order, SPOON_ORDER} = require('../db/models')

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
      include: Spoon
    })
    res.json(currentCart)
  } catch (err) {
    next(err)
  }
})

// THIS WORKS GREAT:
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

// Add an item to cart
router.post('/:itemId', async (req, res, next) => {
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })

    SPOON_ORDER.create({
      orderId: currentCart.dataValues.id,
      spoonId: req.params.itemId
      ///quantity: 7 this will work, if we want to add this to options in singleview.
    })
  } catch (err) {
    next(err)
  }
})

// For submitting an order.
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

// FOR update Quantity
router.put('/:itemId', async (req, res, next) => {
  console.log('@ /put for Update Quantity, req.body', req.body)
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })

    let currentLineItem = await SPOON_ORDER.findOne({
      where: {
        orderId: currentCart.dataValues.id,
        spoonId: req.params.itemId
      }
    })
    currentLineItem.quantity = req.body.quantity // params if thats where we send it on.
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

// Yes, /:itemId needed, used to locate instance in destroy call.
router.delete('/:itemId', async (req, res, next) => {
  console.log('@ router.delete THIS IS req.params: ', req.params)
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })

    // let currentOrder = await SPOON_ORDER.findAll({
    //   where: {
    //     orderId: currentCart.dataValues.id,
    //   },
    // })

    //what if we findbyPk, on Spoon, remove Order, but
    // prob same exact challenges.
    SPOON_ORDER.destroy({
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
