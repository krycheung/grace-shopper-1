import React from 'react'
import {connect} from 'react-redux'
import {fetchSpoons} from '../store/allSpoonsReducer'
import {Link} from 'react-router-dom'

export class AllSpoons extends React.Component {
  async componentDidMount() {
    await this.props.getSpoons()
  }

  render() {
    return <div />
  }
}

const mapState = state => {
  return {
    spoons: state.spoons
  }
}

const mapDispatch = dispatch => {
  return {
    getSpoons: () => dispatch(fetchSpoons())
  }
}

export default connect(mapState, mapDispatch)(AllSpoons)
