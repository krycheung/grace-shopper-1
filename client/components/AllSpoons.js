import React from 'react'
import {connect} from 'react-redux'
import {fetchSpoons} from '../store/allSpoonsReducer'

export class AllSpoons extends React.Component {
  async componentDidMount() {
    await this.props.getSpoons()
  }

  render() {
    return (
      <div>
        <h1>All Spoons</h1>
        <div className="all-spoons-list">
          {this.props.spoons.length ? (
            this.props.spoons.map(spoon => {
              return (
                <div key={spoon.id}>
                  {spoon.imageUrl ? (
                    <img src={spoon.imageUrl} />
                  ) : (
                    <h2>No image</h2>
                  )}
                  <h3>{spoon.name}</h3>
                  <p>By {spoon.brand}</p>
                  <p>Material: {spoon.material}</p>
                  <p>Descrirption: {spoon.description}</p>
                </div>
              )
            })
          ) : (
            <h4>There are no spoons registered in the database</h4>
          )}
        </div>
      </div>
    )
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
