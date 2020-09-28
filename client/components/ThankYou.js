import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {checkoutCartThunk} from '../store/ordersReducer'

class ThankYou extends React.Component {
  componentDidMount() {
    this.props.updateOrders()
  }

  render() {
    return (
      <div>
        <h1>Thank You For Shopping With Spoon City!</h1>
        <h3>
          Your Order{' '}
          <Link to="/cart">
            <span>no. ({this.props.cart.id})</span>
          </Link>{' '}
          has been placed.
        </h3>
        <hr />
        <Link to="/spoons">
          <h2>Continue Shopping</h2>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.orders.cart
  }
}

const mapDispatch = dispatch => {
  return {
    updateOrders: () => dispatch(checkoutCartThunk())
  }
}

export default connect(mapState, mapDispatch)(ThankYou)
