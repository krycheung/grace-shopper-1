const db = require('../server/db')
const {Spoon, User} = require('../server/db/models')

const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000)).toString()

const users = [
  {
    id: 1,
    name: 'Karle Moodies',
    address: '756 Spoon Ave',
    email: 'i_love_spoons@gmail.com'
  },
  {
    id: 2,
    name: 'Cindiaria Tyelsif',
    address: '756 Woodbond Ln',
    email: 'spoon_fantatic@gmail.com'
  },
  {
    id: 3,
    name: 'Happy Happiness',
    address: '23448 Neverfield Rd',
    email: 'crazyspoon@gmail.com'
  },
  {
    id: 4,
    name: 'Doing Great Thank you',
    address: '994443 College St',
    email: 'luv2spoon@gmail.com'
  },
  {
    id: 5,
    name: 'Love My Life',
    address: '474 Archway Pk',
    email: 'iwantspoons@gmail.com'
  }
]

const spoons = [
  {
    id: 1,
    brand: 'IKEA',
    material: 'Stainless Steel',
    category: 'Dining',
    description: 'Your standard spoon',
    price: 9.0,
    imageUrl:
      'https://images.replacements.com/cdn-cgi/image/format=auto,width=555px/https://images.replacements.com/images/images1/flatware/I/P0000339625S0011T1.jpg'
  },
  {
    id: 2,
    brand: 'Falalala',
    material: 'Plastic',
    category: 'Dining',
    description: 'You definitely want one',
    price: 8.5,
    imageUrl:
      'https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw16c1edcd/productimages/901969DT01VAR0039908-901969US01VAR0040346-BI-1.jpg?sw=450&sh=450&sm=fit'
  },
  {
    id: 3,
    brand: 'Ceramica',
    material: 'Ceramic',
    category: 'Dining',
    description: 'Handmade ceramic dining spoon.',
    price: 12.0,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120'
  },
  {
    id: 4,
    brand: 'Crusty',
    material: 'Stainless Steel',
    category: 'Kitchen',
    description: 'Big scooping spoon',
    price: 8.0,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120'
  },
  {
    id: 5,
    brand: 'Square',
    material: 'Stainless Steel',
    category: 'Kitchen',
    description: 'A spoon and a shovel',
    price: 6.5,
    imageUrl:
      'https://img.joomcdn.net/34b8d54a59862d4214e60ed770327086ddd3ca4c_400_400.jpeg'
  },
  {
    id: 6,
    brand: 'Milk bar',
    material: 'Copper',
    category: 'Dessert',
    description: 'Fancy ice cream spoon',
    price: 7.5,
    imageUrl:
      'https://ae01.alicdn.com/kf/H59e205ec163a48b68f146a08572add4a8/Stainless-Steel-Spoon-Gifts-Beautiful-Korean-Spoon-Long-Handle-Spoon-Stir-Drinking-Home-Kitchen-Dessert-Milk.jpeg'
  },
  {
    id: 7,
    brand: 'Ladelmate',
    material: 'Silicone',
    category: 'Soup',
    description: 'Big spoon for like soup and stuff',
    price: 5.5,
    imageUrl:
      'https://i2.wp.com/ae01.alicdn.com/kf/HLB1qw1GX5frK1RjSspbxh74pFXau/1pcs-Thicken-Stainless-Steel-Long-Handle-Ladle-Spoon-Big-Soup-Ladle-Useful-Kitchen-Cooking-Tool-Utensil.jpeg?fit=600%2C600&ssl=1'
  },
  {
    id: 8,
    brand: 'Sporker',
    material: 'Stainless Steel',
    category: 'Travel',
    description: 'Dual edged utensil for scooping or sticking',
    price: 10,
    imageUrl:
      'https://cdn.chv.me/images/thumbnails/Stainless-Steel-Spoon-Fork-ZtLv5AXw.jpeg.thumb_800x800.jpg'
  },
  {
    id: 9,
    brand: 'Matchaful',
    material: 'Stainless Steel',
    category: 'Barista',
    description: 'Perfect portions for matcha and tea',
    price: 4.5,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0898/3392/products/31X_2BDxVW3CL_1080x.jpeg?v=1449438395'
  },
  {
    id: 10,
    brand: 'SLX',
    material: 'Stainless Steel',
    category: 'Slotted',
    description: 'You know, so you can strain what you are scooping',
    price: 11.5,
    imageUrl: 'https://www.slx-hospitality.com/app/uploads/2016/09/53481.jpeg'
  },
  {
    id: 11,
    brand: 'Fishpond',
    material: 'Stainless Steel',
    category: 'Barista',
    description: 'Mermaid machiatto spoon!',
    price: 45.5,
    imageUrl: 'https://cdn-o.fishpond.com/0192/320/731/869833523/original.jpeg'
  },
  {
    id: 12,
    brand: 'Baromone',
    material: 'Stainless steel',
    category: 'Restaraunt',
    description: 'Threaded bar spoon for all of your cocktail hours',
    price: 9.5,
    imageUrl:
      'https://cdnimg.webstaurantstore.com/images/products/extra_large/525451/1951622.jpg'
  },
  {
    id: 13,
    brand: 'Star',
    material: 'Stainless Steel',
    category: 'Novelty',
    description: 'Beat your cat to polluting your beverages with this spoon!',
    price: 8.0,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0384/9722/2787/products/product-image-1321668478_530x@2x.jpg?v=1586858573'
  },
  {
    id: 14,
    brand: 'Joom',
    material: 'Stainless Steel',
    category: 'Barista',
    description: 'Gold, stainless steel coffee spoon',
    price: 13.5,
    imageUrl:
      'https://img.joomcdn.net/99aa39d5b31f6ce65d1f6d1b94a1dcbe7145bab1_original.jpeg'
  },
  {
    id: 15,
    brand: 'Webstaraunt',
    material: 'Wood',
    category: 'Kitchen',
    description: 'If grandma has it in her hand, run!',
    price: 7.5,
    imageUrl: 'https://www.zoro.com/static/cms/product/full/Z30O-xfo5oy.JPG'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    const customers = await Promise.all(
      users.map(user =>
        User.create({
          name: user.name,
          address: user.address,
          email: user.email
        })
      )
    )

    const itemInCart = await Promise.all(
      spoons.map(spoon =>
        Spoon.create({
          id: spoon.id,
          brand: spoon.brand,
          material: spoon.material,
          category: spoon.category,
          description: spoon.description,
          price: spoon.price,
          imageUrl: spoon.imageUrl
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
