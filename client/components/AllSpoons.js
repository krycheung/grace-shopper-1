import React from 'react'
import {connect} from 'react-redux'
import {fetchSpoons, deleteSpoonThunk} from '../store/allSpoonsReducer'
import {Link} from 'react-router-dom'
import {ProductForm} from './adminAddProduct'

class AllSpoons extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSpoons()
  }

  getSpoonRoute(id) {
    return `/spoons/${id}`
  }

  render() {
    const spoons = this.props.spoons
    return (
      <div>
        {this.props.isAdmin ? <ProductForm /> : null}
        <h1>All Spoons</h1>
        <div className="all-spoons-container">
          {spoons.length ? (
            spoons.map(spoon => {
              return (
                <div className="spoon" key={spoon.id}>
                  <Link to={this.getSpoonRoute(spoon.id)}>
                    <div>
                      {spoon.imageUrl ? (
                        <img className="spoon-img" src={spoon.imageUrl} />
                      ) : (
                        <h2>No image</h2>
                      )}
                    </div>
                    <p>Price: ${spoon.price}</p>
                    <p>By {spoon.brand}</p>
                    <p>The {spoon.name}</p>
                  </Link>
                  {this.props.isAdmin ? (
                    <button
                      type="button"
                      onClick={() => {
                        this.props.deleteSpoon(spoon.id)
                      }}
                    >
                      Delete Item
                    </button>
                  ) : null}
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
    spoons: state.spoons,
    user: state.user,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getSpoons: () => dispatch(fetchSpoons()),
    deleteSpoon: id => dispatch(deleteSpoonThunk(id))
  }
}

export default connect(mapState, mapDispatch)(AllSpoons)
