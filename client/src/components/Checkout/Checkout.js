import React from "react";
import { Elements } from "react-stripe-elements";

import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import HomeNavbar from "../Dashboards/Navbar/HomeNavbar";

import Card from "@material-ui/core/Card";

import InjectedCheckoutForm from "./InjectedCheckoutForm";

import Image from "../../images/bg3.jpg";

const styles = theme => ({
  button: {
    width: '100%',
    backgroundColor: '#E91E63',
    margin: 0,
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
    justifyContent: "center"
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
    backgroundImage: `url(${Image})`,
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

class Checkout extends React.Component {
  state = {
    currentVacationMenu: false,
    pastVacationMenu: false
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <HomeNavbar data={this.state} />
        <div className={classes.innerContainer}>
          <Paper className={classes.paper}>
            <div className={classes.cardContainer}>
              <Card className={classes.card}>
              <h1 className={classes.cardTitle}>Card Details</h1>
                <Elements>
                  <InjectedCheckoutForm
                    title={this.props.location.state.title}
                    currentVacationTitle={this.props.location.state.currentVacationTitle}
                    id={this.props.id}
                  />
                </Elements>
              </Card>
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Checkout);
