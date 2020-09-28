import React from 'react'

export default class ContactAndPayment extends React.Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      nameOnCard: '',
      creditCard1: '',
      creditCard2: '',
      creditCard3: '',
      creditCard4: '',
      expiry: '',
      cvc: '',
      errorMessage: '*required field'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const currentKey = event.target.name
    this.setState({
      [currentKey]: event.target.value
    })
  }

  render() {
    const requiredField = (
      <span className="required">{this.state.errorMessage}</span>
    )
    return (
      <div>
        <label htmlFor="phone">Contact</label>
        <input
          type="text"
          name="phone"
          value={this.state.phone}
          placeholder="Enter phone # here"
          onChange={this.handleChange}
        />
        {requiredField}
        <hr />
        <h4>Payment Information</h4>
        <label htmlFor="nameOnCard">Name Of Cardholder</label>
        <input
          type="text"
          name="nameOnCard"
          value={this.state.nameOnCard}
          placeholder="Cardholder name"
          onChange={this.handleChange}
        />
        {requiredField}
        <label htmlFor="inputCard">Card Number</label>
        {requiredField}
        <input
          className="inputCard"
          type="text"
          name="creditCard1"
          value={this.state.creditCard1}
          id="creditCard1"
          onChange={this.handleChange}
        />
        -
        <input
          className="inputCard"
          type="text"
          name="creditCard2"
          value={this.state.creditCard2}
          id="creditCard2"
          onChange={this.handleChange}
        />
        -
        <input
          className="inputCard"
          type="text"
          name="creditCard3"
          value={this.state.creditCard3}
          id="creditCard3"
          onChange={this.handleChange}
        />
        -
        <input
          className="inputCard"
          type="text"
          name="creditCard4"
          value={this.state.creditCard4}
          id="creditCard4"
          onChange={this.handleChange}
        />
        <br />
        Card Expiry:
        <input
          className="inputCard"
          type="text"
          name="expiry"
          value={this.state.expiry}
          id="expiry"
          onChange={this.handleChange}
        />
        {requiredField}
        <label htmlFor="cvc">CVC</label>
        <input
          type="text"
          name="cvc"
          value={this.state.cvc}
          placeholder="CVC"
          onChange={this.handleChange}
        />
        {requiredField}
      </div>
    )
  }
}
