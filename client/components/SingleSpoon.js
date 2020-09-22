import React, {Component} from 'react'
import {getSingleSpoonThunk} from '../store/singleSpoonReducer'
import {connect} from 'react-redux'

export class SingleSpoon extends Component() {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.gotSingleSpoon(this.props.match.params.spoonId)
  }

  render() {
    return (
      <div>
        <h1>Testing</h1>
        <img src={this.state.singleSpoon.imageUrl} />
        <h2>Material:{this.state.singleSpoon.material}</h2>
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
