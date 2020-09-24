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

export const fetchCart = () => {
  return async dispatch => {
    try {
      //const response = await axios.get('/api/spoons')
      const cart = response.data
      dispatch(getCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {orders: [], cart: {}}

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
