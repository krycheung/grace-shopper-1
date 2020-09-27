import React from 'react'

export default function ContactAndPayment() {
  return (
    <div>
      <label htmlFor="phone">Contact</label>
      <input type="text" name="phone" placeholder="Enter phone # here" />
      <hr />
      <h4>Payment Information</h4>
      <label htmlFor="nameOnCard">Name Of Cardholder</label>
      <input type="text" name="nameOnCard" placeholder="Cardholder name" />
      <input
        className="inputCard"
        type="text"
        name="creditCard1"
        id="creditCard1"
      />
      -
      <input
        className="inputCard"
        type="text"
        name="creditCard2"
        id="creditCard2"
      />
      -
      <input
        className="inputCard"
        type="text"
        name="creditCard3"
        id="creditCard3"
      />
      -
      <input
        className="inputCard"
        type="text"
        name="creditCard4"
        id="creditCard4"
      />
      <br />
      Card Expiry:
      <input className="inputCard" type="text" name="expiry" id="expiry" />
      <label htmlFor="cvc">CVC</label>
      <input type="text" name="cvc" placeholder="CVC" />
    </div>
  )
}
