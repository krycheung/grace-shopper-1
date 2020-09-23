import React, {Component} from 'react'
import {getSingleSpoonThunk} from '../store/singleSpoonReducer'
import {connect} from 'react-redux'

export class SingleSpoon extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //console.log('Comp Did Mount Fired', this.props.match.params.spoonId)
    this.props.gotSingleSpoon(this.props.match.params.spoonId)
  }

  render() {
    //console.log("this.props.singleSpoon:", this.props.singleSpoon)
    return (
      <div>
        <h1>The {this.props.singleSpoon.brand}</h1>
        <img src={this.props.singleSpoon.imageUrl} />
        <h3>Description:{this.props.singleSpoon.description}</h3>
        <h2>Material:{this.props.singleSpoon.material}</h2>
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
  gotSingleSpoon: id => dispatch(getSingleSpoonThunk(id))
})

export default connect(mapState, mapDispatch)(SingleSpoon)
