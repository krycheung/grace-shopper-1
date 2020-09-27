import React from 'react'
import {connect} from 'react-redux'
import {updateSpoonThunk} from '../store/singleSpoonReducer'

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
      imageUrl: '',
      quantity: 0
    }
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
      imageUrl,
      quantity
    } = this.state
    const newSpoon = {
      brand,
      name,
      material,
      category,
      description,
      price,
      imageUrl,
      quantity
    }

    this.props.createSpoon(newSpoon)
    this.setState({
      brand: '',
      name: '',
      material: '',
      category: '',
      description: '',
      price: 0,
      imageUrl: '',
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
      imageUrl,
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
          <label htmlFor="imageUrl">Image:</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="quantity">Quantity:</label>
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

const mapDispatch = dispatch => {
  return {
    createSpoon: (
      brand,
      name,
      material,
      category,
      description,
      price,
      imageUrl,
      quantity
    ) =>
      dispatch(
        updateSpoonThunk(
          brand,
          name,
          material,
          category,
          description,
          price,
          imageUrl,
          quantity
        )
      )
  }
}

export const UpdateProductForm = connect(null, mapDispatch)(updateSpoon)
