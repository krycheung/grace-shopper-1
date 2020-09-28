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
      // itemId: 0,
      newQuantity: 0
    }

    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmitQuantity = this.handleSubmitQuantity.bind(this)
    this.handleInputQuantity = this.handleInputQuantity.bind(this)
    //this.handleGetItemId = this.handleGetItemId.bind(this)
  }

  componentDidMount() {
    // where we have a switch case for signed in or not (local state stuff)??

    this.props.getCart()
    this.props.getHistory()
  }

  handleRemove(e) {
    this.props.removeItem(e.target.value)
  }

  handleInputQuantity(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // handleGetItemId(e) {
  //   this.setState({
  //     itemId: e.target.value
  //   })
  // }

  handleSubmitQuantity(itemId) {
    console.log('CART @ handleSubmitQuantity:', itemId, this.state.newQuantity)
    this.props.updateItem(itemId, this.state.newQuantity)
  }

  render() {
    let cart = this.props.cart
    let history = this.props.history
    return (
      <div className="sideby">
        <div className="halfWidth medLeftMargin">
          <h1>Cart</h1>
          <h4>You have {cart.spoons.length} in your cart.</h4>
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
                    <div>
                      <p>Brand: {spoon.brand}</p>
                      <p>Name: {spoon.name}</p>
                      <p>Price: ${spoon.price}</p>
                      <p>Quantity: {spoon.SPOON_ORDER.quantity}</p>
                    </div>

                    <div>
                      <form
                        onSubmit={() => this.handleSubmitQuantity(spoon.id)}
                      >
                        {/* <form onSubmit={this.handleUpdateQuantity}> */}
                        <div>
                          <label htmlFor="newQuantity">Change Quantity: </label>
                          <input
                            onChange={this.handleInputQuantity}
                            type="number"
                            name="newQuantity"
                            step="1"
                            min="1"
                            ///defaultValue={spoon.SPOON_ORDER.quantity} // not working.
                            value={this.state.newQuantity}
                            // value={{ newQuantity: this.state.newQuantity, itemId: spoon.id }}
                          />
                        </div>

                        <button onClick={this.handleGetItemId} type="submit">
                          Update
                        </button>
                      </form>
                    </div>

                    <div>
                      <button
                        className="space"
                        // onClick={this.handleRemove}
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
                <button className="largeRightMargin" type="submit">
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
    history: state.orders.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCart()),
    getHistory: () => dispatch(fetchOrders()),
    removeItem: itemId => dispatch(removeItem(itemId)),
    // CAN WE SEND AN OBJECT: {itemID, NewQuantity} ??
    updateItem: (itemId, newQuantity) =>
      dispatch(updateItem(itemId, newQuantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)

//and/or set state to hold new quantity num.
// CAN the value={stuff}  on change quantity button be an object that has {itemID, NewQuantity}
