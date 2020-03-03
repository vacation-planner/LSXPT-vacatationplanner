import React from 'react';
import {CardElement} from 'react-stripe-elements';

import "./CardSection.css";

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

const CardSection = () => {
  return (
      <CardElement className="MyCardElement" style={style} />
  );
};

export default CardSection;