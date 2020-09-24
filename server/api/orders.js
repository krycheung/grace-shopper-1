const router = require('express').Router()
const {User, Spoon, Order, SPOON_ORDER} = require('../db/models')

router.get('/cart', async (req, res, next) => {
  const userId = req.body.userId
  try {
    let hasCart = await Order.findOne({
      where: {
        userId: userId,
        status: false
      }
    })
    res.json(hasCart)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  const userId = req.body.userId
  try {
    let newCart = await Order.create({userId: userId})
    res.json(newCart)
  } catch (err) {
    next(err)
  }
})

// add first thing, start an order instance
// router.put('/', async (req, res, next) => { // info in req.body

//     }
//      currentOrder.addSpoon()

//     // check in db for order { where: userId is user, status: false, if none, create instatnce

//   } catch(err) {
//     console.error(err)
//     next(err)
//   }
// })

module.exports = router
