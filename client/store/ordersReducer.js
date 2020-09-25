import axios from 'axios'

export const GET_ORDERS = 'GET_ORDERS'
export const GET_CART = 'GET_CART'

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      //const response = await axios.get('/api/spoons')
      const orders = response.data
      dispatch(getOrders(orders))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCart = (userId = 2) => {
  // << JUST for test purpose, MUST remove when local storage set up.
  return async dispatch => {
    try {
      const foundCartResponse = await axios.get('/api/orders/cart')
      const cart = foundCartResponse.data
      dispatch(getCart(cart))
    } catch (err) {
      try {
        const madeCartResponse = await axios.post('/api/orders/cart', {
          userId: userId
        })
        const cart = madeCartResponse.data
        dispatch(getCart(cart))
      } catch (error) {
        console.error(error)
      }
    }
  }
}

const initialState = {orders: [], cart: {spoons: []}}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
