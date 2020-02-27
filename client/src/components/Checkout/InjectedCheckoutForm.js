import React from "react";
import { injectStripe } from "react-stripe-elements";
import { Redirect } from "react-router-dom";
import { AppContext } from "../Context/AppContext"

import CardSection from "./CardSection";
import axios from "axios";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false, redirect: false, name: "", message: "" };
  }

  inputHandler = ev => {
    this.setState({ ...this.state, name: ev.target.value });
  };

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    axios
      .post("http://localhost:5500/api/stripe")
      .then(res => {
        this.props.stripe
          .confirmCardPayment(res.data.clientSecret, {
            payment_method: {
              card: this.props.elements.getElement("card"),
              billing_details: {
                name: this.state.name
              }
            }
          })
          .then(async response => {
            if (response.error) {
              console.log({ STRIPE_ERR: response.error });
              this.setState({ error: true });
            } else if (
              response.paymentIntent &&
              response.paymentIntent.status === "succeeded"
            ) {
              this.setState({ error: false, redirect: true, message: "" });
            }
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({ ...this.state, message: err });
      });
  };

  render() {
    if (this.state.redirect) {
      {
        return (
          <Redirect
            to={{
              pathname: "/dashboards/current",
              state: {
                title: this.props.title,
                vacationName: this.props.vacationName
              }
            }}
          />
        );
      }
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Full Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.inputHandler}
                />
              </label>
            </div>
            <CardSection />
            <button>Confirm order</button>
          </form>
          {this.state.error ? <div>There was an error!</div> : null}
        </div>
      );
    }
  }
}

CheckoutForm.contextType = AppContext;

export default injectStripe(CheckoutForm);
