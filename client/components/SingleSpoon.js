import React, {Component} from 'react'
import {getSingleSpoonThunk} from '../store/singleSpoonReducer'
import {addToCartThunk} from '../store/ordersReducer'
import {connect} from 'react-redux'
import {UpdateProductForm} from './adminUpdateSpoon'

export class SingleSpoon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminControl: false
    }
    this.adminEdits = this.adminEdits.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  adminEdits() {
    console.log('in single spoon:', this.props)
    if (this.props.user.isAdmin) {
      this.setState({
        adminControl: true
      })
    } else {
      this.setState({
        adminControl: false
      })
    }
  }

  componentDidMount() {
    //console.log('Comp Did Mount Fired', this.props.match.params.spoonId)
    this.props.gotSingleSpoon(this.props.match.params.spoonId)
    this.adminEdits()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addToCart(this.props.match.params.spoonId)
  }

  render() {
    //console.log("this.props.singleSpoon:", this.props.singleSpoon)
    const {singleSpoon} = this.props
    const {adminControl} = this.state
    return (
      <div>
        <h1>By: {singleSpoon.brand}</h1>
        <img src={singleSpoon.imageUrl} />
        <h3>Name: {singleSpoon.name}</h3>
        <h3>Description: {singleSpoon.description}</h3>
        <h2>Material: {singleSpoon.material}</h2>
        <h3>Price: {singleSpoon.price}</h3>
        <button onClick={this.handleSubmit}>Add To Cart</button>

        {adminControl && <UpdateProductForm />}
        {/* <button onClick={}>Edit Item</button> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleSpoon: state.singleSpoon,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  gotSingleSpoon: id => dispatch(getSingleSpoonThunk(id)),
  addToCart: spoonId => dispatch(addToCartThunk(spoonId))
})

export default connect(mapState, mapDispatch)(SingleSpoon)
