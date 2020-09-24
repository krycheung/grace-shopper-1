import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/ordersReducer'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    let cart = this.props.cart
    return (
      <div>
        <h1>Cart</h1>
        <h4>You have {cart.spoons.length} in your cart.</h4>
        {cart.spoons.length ? (
          <div>
            {cart.spoons.map(spoon => {
              return (
                <div key={spoon.id}>
                  <div>
                    {spoon.imageUrl ? (
                      <img className="spoon-img" src={spoon.imageUrl} />
                    ) : (
                      <h2>No image</h2>
                    )}
                  </div>
                  <p>Price: ${spoon.price}</p>
                  <button type="button">Remove Item</button>
                </div>
              )
            })}
            <button type="submit">Checkout</button>
          </div>
        ) : (
          <h4>Your cart is empty!</h4>
        )}
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
    getCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
