const {green, red} = require('chalk')
const db = require('../server/db')
const {Spoon, User} = require('../server/db/models')

const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000)).toString()

const users = [
  {
    id: 1,
    email: 'i_love_spoons@gmail.com'
  },
  {
    id: 2,
    email: 'spoon_fantatic@gmail.com'
  },
  {
    id: 3,
    email: 'crazyspoon@gmail.com'
  }
]

const spoons = [
  {
    id: 1,
    brand: 'IKEA',
    material: 'fake-ass-silver',
    category: 'dining',
    description: 'standard-ass-spoon',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0158/4237/7792/products/1_ab28907e-e919-4c70-8125-98df89bbf9a4_1200x1200.png?v=1593577877'
  },
  {
    id: 2,
    brand: 'Falalala',
    material: 'real deal plastic',
    category: 'casual',
    description: 'you definitely want it',
    imageUrl:
      'https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw16c1edcd/productimages/901969DT01VAR0039908-901969US01VAR0040346-BI-1.jpg?sw=450&sh=450&sm=fit'
  },
  {
    id: 3,
    brand: 'Ceramica',
    material: 'ceramic',
    category: "whatever you're feeling",
    description: 'careful with this one',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    const customers = await Promise.all(
      users.map(user =>
        User.create({
          email: user.email
        })
      )
    )

    const itemInCart = await Promise.all(
      spoons.map(spoon =>
        Spoon.create({
          id: spoon.id,
          brand: spoon.brand
        })
      )
    )

    await customers[0].addSpoon(itemInCart[0])
    await customers[1].addSpoon(itemInCart[1])

    // seed your database here!
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
//fix this
