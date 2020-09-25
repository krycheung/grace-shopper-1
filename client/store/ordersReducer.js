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
      const response = await axios.get('/api/history') //{ userId }
      const orders = await response.data
      dispatch(getOrders(orders))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCart = userId => {
  return async dispatch => {
    try {
      const foundCartResponse = await axios.put('/api/orders/cart', {userId})
      const cart = foundCartResponse.data
      //console.log({cart})
      dispatch(getCart(cart)) // {cart} is same as an instance from Order table. Rignt now just Id, status & userId
    } catch (err) {
      console.error(err)
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
