import React, {Component} from 'react'
import {getSingleSpoonThunk} from '../store/singleSpoonReducer'
import {addToCart} from '../store/ordersReducer'
import {connect} from 'react-redux'

export class SingleSpoon extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    //console.log('Comp Did Mount Fired', this.props.match.params.spoonId)
    this.props.gotSingleSpoon(this.props.match.params.spoonId)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addToCart(this.props.match.params.spoonId)
  }

  render() {
    //console.log("this.props.singleSpoon:", this.props.singleSpoon)
    const {singleSpoon} = this.props
    return (
      <div>
        <h1>By: {singleSpoon.brand}</h1>
        <img src={singleSpoon.imageUrl} />
        <h3>Description: {singleSpoon.description}</h3>
        <h2>Material: {singleSpoon.material}</h2>
        <button onClick={this.handleSubmit}>Add To Cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleSpoon: state.singleSpoon
  }
}

const mapDispatch = dispatch => ({
  gotSingleSpoon: id => dispatch(getSingleSpoonThunk(id)),
  addToCart: spoonId => dispatch(addToCart(spoonId))
})

export default connect(mapState, mapDispatch)(SingleSpoon)
