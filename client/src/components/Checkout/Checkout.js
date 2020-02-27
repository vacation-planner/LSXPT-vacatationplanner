import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './InjectedCheckoutForm';

class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm title={this.props.location.state.title} vacationName={this.props.location.state.vacationName} id={this.props.id} />
      </Elements>
    );
  }
}

export default Checkout;