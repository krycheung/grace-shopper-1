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
    this.state = {
      newQuantity: 0
    }

    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmitQuantity = this.handleSubmitQuantity.bind(this)
    this.handleInputQuantity = this.handleInputQuantity.bind(this)
    this.handleClickCheckout = this.handleClickCheckout.bind(this)
    this.convertDate = this.convertDate.bind(this)
  }

  componentDidMount() {

    this.props.getCart()

    this.props.getHistory()
  }

  handleClickCheckout(e) {
    e.preventDefault()
    this.props.history.push('/checkoutform')
  }

  handleRemove(e) {
    e.preventDefault()
    let loggedIn = !!this.props.user.id
    console.log('@ Handle Remove:', loggedIn)
    this.props.removeItem(e.target.value, loggedIn)
  }

  handleInputQuantity(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitQuantity(e, itemId) {
    e.preventDefault()
    this.props.updateItem(itemId, this.state.newQuantity)
  }

  convertDate(date) {
    let newDate = new Date(date)
    return (
      (newDate.getMonth() > 8
        ? newDate.getMonth() + 1
        : '0' + (newDate.getMonth() + 1)) +
      '/' +
      (newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()) +
      '/' +
      newDate.getFullYear()
    )
  }

  render() {
    let cart = this.props.cart
    let history = this.props.orderHistory

    return (
      <div className="sideby">
        <div className="halfWidth medLeftMargin">
          <h1>Cart</h1>
          {cart.spoons.length ? (
            <div>
              {cart.spoons.map(spoon => {
                return (
                  <div
                    key={spoon.id}
                    className="bottomMargin cartItemsContainer"
                  >
                    <div>
                      {spoon.imageUrl ? (
                        <img className="spoon-img" src={spoon.imageUrl} />
                      ) : (
                        <h2>No image</h2>
                      )}
                    </div>
                    <div>
                      <p>Brand: {spoon.brand}</p>
                      <p>Name: {spoon.name}</p>
                      <p>Price: ${spoon.price}</p>
                      <p>Quantity: {spoon.SpoonOrder.quantity}</p>
                    </div>
                    <form
                      className="AlignSelfLeft"
                      onSubmit={e => this.handleSubmitQuantity(e, spoon.id)}
                    >
                      <label className="space" htmlFor="newQuantity">
                        Change Quantity:{' '}
                      </label>
                      <input
                        onChange={this.handleInputQuantity}
                        type="number"
                        name="newQuantity"
                        step="1"
                        min="1"
                        value={this.state.newQuantity}
                      />

                      <button className="space" type="submit">
                        Update
                      </button>
                    </form>
                    <div>
                      <button
                        className="space"
                        onClick={this.handleRemove}
                        value={spoon.id}
                        type="button"
                      >
                        Remove Item
                      </button>
                    </div>
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
                <h4>Date: {this.convertDate(order.updatedAt)}</h4>
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
    removeItem: (itemId, isLoggedIn) =>
      dispatch(removeItem(itemId, isLoggedIn)),
    updateItem: (itemId, newQuantity) =>
      dispatch(updateItem(itemId, newQuantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)
