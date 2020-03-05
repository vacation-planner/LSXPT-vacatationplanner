import React from "react";
import { injectStripe } from "react-stripe-elements";
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import withStyles from "@material-ui/core/styles/withStyles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import CardSection from "./CardSection";
import axios from "axios";

const styles = theme => ({
  button: {
    width: '100%',
    backgroundColor: '#E91E63',
    marginTop: "10px",
    color: 'white',
    height: '40px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    '&:hover': {
        color: 'white',
        backgroundColor: '#AA1649'
    }
},
  card: {
    width: "85%",
    minWidth: 300,
    margin: "20px",
    minHeight: 325,
    padding: "15px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cardActions: {
    padding: 0,
    margin: 0
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    backgroundColor: "#E91E63",
    width: "100%",
    textAlign: "left"
  },
  cardContent: {
    padding: 0,
    margin: 0
  },
  cardFeatures: {
    fontSize: "2.0rem",
    display: "inline-block",
    paddingBottom: "4px",
    borderBottom: "1px solid black",
    width: "91px",
    marginBottom: "15px"
  },
  cardText: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    width: "100%"
  },
  cardTitle: {
    fontSize: "2.5rem",
    marginBottom: "25px",
    width: "100%",
    textAlign: "center"
  },
  innerContainer: {
    marginTop: 65,
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    minHeight: "calc(100vh - 65px)"
  },
  main: {
    width: "100%",
    display: "flex", // Fix IE 11 issue.
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#E2E2E2"
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#E2E2E2"
  }
});

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
              card: this.props.elements.getElement("card")
              // billing_details: {
              //   name: this.state.name
              // }
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
              this.context.setPremium(this.context.state.currentVacationId, 1);
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
    const { classes } = this.props;
    if (this.state.redirect) {
      {
        return (
          <Redirect
            to={{
              pathname: "/dashboards/current",
              state: {
                title: this.props.title,
                currentVacationTitle: this.props.currentVacationTitle
              }
            }}
          />
        );
      }
    } else {
      return (
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <CardSection className={classes.cardText}/>
            <CardActions className={classes.cardActions}>
              <Button className={classes.button} onClick={this.handleSubmit}>Confirm order</Button>
            </CardActions>
          </form>
          {this.state.error ? <div>There was an error!</div> : null}
        </CardContent>
      );
    }
  }
}

CheckoutForm.contextType = AppContext;

export default injectStripe(withStyles(styles)(CheckoutForm));
