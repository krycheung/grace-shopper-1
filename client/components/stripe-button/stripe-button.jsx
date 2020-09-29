import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100
  const publishableKey =
    'pk_test_51HWkzYITiWRJ1CPf09Bl259udXoVzCr1FvpLhSx3ThO67M81ZtUODtPvonimIg68ZDmCFL21OPBQe7BaUesRbkWs00ke4ovbPs'

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }
  //pass the token to backend to process the charge

  return (
    <StripeCheckoutButton
      label="Pay Now"
      name="Spoon City"
      billingAddress
      shippingAddress
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Checkout"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
