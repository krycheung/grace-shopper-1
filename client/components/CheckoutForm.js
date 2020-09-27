import React from 'react'
import {connect} from 'react-redux'
import ContactAndPayment from './ContactAndPayment'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      useAddress: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.useDifAddress = this.useDifAddress.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.history.push('/cart')
  }

  useDifAddress(event) {
    event.preventDefault()
    this.setState({
      useAddress: false
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.useAddress ? (
            <div>
              <h3>Ship To: </h3>
              <p>{this.props.user.address} </p>
              <button onClick={this.useDifAddress} type="button">
                Change Address
              </button>
              <hr />
              <ContactAndPayment />
            </div>
          ) : (
            <div>
              <h4>Shipping Information</h4>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeHolder="Enter name here" />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeHolder="Enter address here"
              />
              <label htmlFor="address2">Address Line 2 (optional)</label>
              <input type="text" name="address2" placeHolder="Ex: Apt 5C" />
              <label htmlFor="city">City</label>
              <input type="text" name="city" placeHolder="Enter city here" />
              <label htmlFor="state">State</label>
              <select>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <label htmlFor="zip">ZipCode</label>
              <input type="text" name="zip" placeHolder="Enter ZipCode here" />
              <hr />
              <ContactAndPayment />
            </div>
          )}
          <hr />
          <button type="submit">Place Order</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(CheckoutForm)
