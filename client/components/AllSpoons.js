import React from 'react'
import {connect} from 'react-redux'
import {fetchSpoons} from '../store/allSpoonsReducer'
import {Link} from 'react-router-dom'
import {ProductForm} from './adminAddProduct'

class AllSpoons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adminControl: false
    }
    this.adminEdits = this.adminEdits.bind(this)
  }
  adminEdits() {
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
    this.props.getSpoons()
    this.adminEdits()
  }

  getSpoonRoute(id) {
    return `/spoons/${id}`
  }

  render() {
    const {adminControl} = this.state
    return (
      <div>
        {adminControl && <ProductForm />}
        <h1>All Spoons</h1>
        <div className="all-spoons-container">
          {this.props.spoons.length ? (
            this.props.spoons.map(spoon => {
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
                    <p>Material: {spoon.material}</p>
                    <p>Description: {spoon.description}</p>
                  </Link>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSpoons: () => dispatch(fetchSpoons())
  }
}

export default connect(mapState, mapDispatch)(AllSpoons)
