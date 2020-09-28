import React, {Component} from 'react'
import {getSingleSpoonThunk} from '../store/singleSpoonReducer'
import {addToCartThunk} from '../store/ordersReducer'
import {connect} from 'react-redux'
import {UpdateProductForm} from './adminUpdateSpoon'

export class SingleSpoon extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.gotSingleSpoon(this.props.match.params.spoonId)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addToCart(this.props.match.params.spoonId)
  }

  render() {
    const spoon = this.props.singleSpoon
    return (
      <div>
        <h1>By: {spoon.brand}</h1>
        <img src={spoon.imageUrl} />
        <h3>Name: {spoon.name}</h3>
        <h3>Description: {spoon.description}</h3>
        <h3>Material: {spoon.material}</h3>
        <h3>Price: {spoon.price}</h3>
        <button type="button" onClick={this.handleSubmit}>
          Add To Cart
        </button>

        <h3>Edit Spoon Details:</h3>
        {this.props.isAdmin ? <UpdateProductForm /> : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleSpoon: state.singleSpoon,
    user: state.user,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => ({
  gotSingleSpoon: id => dispatch(getSingleSpoonThunk(id)),
  addToCart: spoonId => dispatch(addToCartThunk(spoonId))
})

export default connect(mapState, mapDispatch)(SingleSpoon)
