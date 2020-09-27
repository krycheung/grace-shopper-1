import axios from 'axios'

export const GET_ORDERS = 'GET_ORDERS'
export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addSpoonToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders/history')
      const orders = await response.data
      dispatch(getOrders(orders))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const foundCartResponse = await axios.get('/api/orders/cart')
      const cart = foundCartResponse.data
      dispatch(getCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addToCart = spoonId => {
  console.log(spoonId)
  return async dispatch => {
    try {
      const addItem = await axios.post('/api/orders/cart', spoonId)
      const cartItem = addItem.data
      dispatch(addSpoonToCart(cartItem, spoonId))
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
    case ADD_TO_CART:
      return {...state, cart: {...spoons, spoons: action.item}}
    default:
      return state
  }
}
