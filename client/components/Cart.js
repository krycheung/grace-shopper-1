import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCart,
  fetchOrders,
  removeItem,
  updateItem
} from '../store/ordersReducer'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this)
    this.handleClickCheckout = this.handleClickCheckout.bind(this)
  }

  componentDidMount() {
    // where we have a switch case for signed in or not (local state stuff)??

    this.props.getCart()
    this.props.getHistory()
  }

  handleClickCheckout(e) {
    e.preventDefault()
    this.props.history.push('/checkoutform')
  }

  handleRemove(e) {
    this.props.removeItem(e.target.value)
  }

  handleUpdateQuantity(e) {
    // get info off state
    this.props.updateItem(e.target.value)
  }

  render() {
    let cart = this.props.cart
    let history = this.props.orderHistory
    return (
      <div className="sideby">
        <div className="halfWidth medLeftMargin">
          <h1>Cart</h1>
          <h4>You have {cart.spoons.length} items in your cart.</h4>
          {cart.spoons.length ? (
            <div>
              {cart.spoons.map(spoon => {
                return (
                  <div key={spoon.id} className="bottomMargin">
                    <div>
                      {spoon.imageUrl ? (
                        <img className="spoon-img" src={spoon.imageUrl} />
                      ) : (
                        <h2>No image</h2>
                      )}
                    </div>
                    <p>Brand: {spoon.brand}</p>
                    <p>Name: {spoon.name}</p>
                    <p>Price: ${spoon.price}</p>

                    {/* and/or set state to hold new quantity num. 
                  CAN the value={stuff}  on change quantity button be an object that has {itemID, NewQuantity}  */}
                    <button
                      className="space"
                      onClick={this.handleRemove}
                      value={spoon.id}
                      type="button"
                    >
                      Remove Item
                    </button>
                  </div>
                )
              })}
              <div className="justifySelfRight row">
                <button
                  onClick={this.handleClickCheckout}
                  className="largeRightMargin"
                  type="button"
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <h4>Your cart is empty!</h4>
          )}
        </div>
        <div className="halfWidth smLeftMargin">
          <h2>Order History</h2>
          {history.map(order => {
            return (
              <div key={'order' + order.id}>
                <h4>Date: {order.dateCreated}</h4>
                <div className="history-spoons-container">
                  {order.spoons.map(spoon => {
                    return (
                      <div key={spoon.id}>
                        <div>
                          {spoon.imageUrl ? (
                            <img
                              className="spoon-img-thumbnail"
                              src={spoon.imageUrl}
                            />
                          ) : (
                            <h2>No image</h2>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.orders.cart,
    user: state.user,
    orderHistory: state.orders.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCart()),
    getHistory: () => dispatch(fetchOrders()),
    removeItem: itemId => dispatch(removeItem(itemId)),
    // CAN WE SEND AN OBJECT: {itemID, NewQuantity} ??
    updateItem: iteminfoObj => dispatch(updateItem(iteminfoObj))
  }
}

export default connect(mapState, mapDispatch)(Cart)
