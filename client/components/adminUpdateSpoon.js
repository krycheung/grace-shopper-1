import React from 'react'
import {connect} from 'react-redux'
import {
  updateSpoonThunk,
  getSingleSpoonThunk
} from '../store/singleSpoonReducer'

class updateSpoon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: '',
      name: '',
      material: '',
      category: '',
      description: '',
      price: 0,
      quantity: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault()
    const {
      brand,
      name,
      material,
      category,
      description,
      price,
      quantity
    } = this.state
    const newSpoon = {
      brand,
      name,
      material,
      category,
      description,
      price,
      quantity
    }
    this.props.updateSpoon(this.props.singleSpoon.id, newSpoon)
    this.setState({
      brand: '',
      name: '',
      material: '',
      category: '',
      description: '',
      price: 0,
      quantity: 0
    })
  }

  render() {
    const {
      brand,
      name,
      material,
      category,
      description,
      price,
      quantity
    } = this.state
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={this.handleChange}
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="material">Material:</label>
          <input
            type="text"
            name="material"
            value={material}
            onChange={this.handleChange}
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleChange}
          />
          <label htmlFor="quantity">Stock Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    singleSpoon: state.singleSpoon
  }
}

const mapDispatch = dispatch => ({
  updateSpoon: (
    id,
    brand,
    name,
    material,
    category,
    description,
    price,
    quantity
  ) =>
    dispatch(
      updateSpoonThunk(
        id,
        brand,
        name,
        material,
        category,
        description,
        price,
        quantity
      )
    ),
  gotSingleSpoon: id => dispatch(getSingleSpoonThunk(id))
})

export const UpdateProductForm = connect(mapState, mapDispatch)(updateSpoon)
