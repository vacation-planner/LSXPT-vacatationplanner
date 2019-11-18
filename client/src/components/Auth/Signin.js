import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { fire } from "./firebaseConfig"; // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Navbar from '../Dashboards/Navbar/LPNavbar.js';

import { Redirect } from "react-router-dom";
import styles from "../StyledComponents/Signin/styles";
import {
  withStyles,
  Paper,
  Typography,
  Avatar
} from "@material-ui/core";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

class Signin extends Component {
  isIOS = () => {
    // IF this is IOS redirect if its web use popup
    if ("standalone" in window.navigator && !window.navigator.standalone) {
      return "redirect";
    } else {
      return "popup";
    }
  };

  uiConfig = {
    signInFlow: this.isIOS(),
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboards" }
    };
    if (this.props.redirect === true) {
      return <Redirect to={from} />;
    }

    return (
      <main className={classes.main}>
        <Navbar />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIndIcon />
          </Avatar>
          <Typography className={classes.typography}>
            Sign In
          </Typography>

          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={fire}
            user={fire.currentUser}
            className={classes.fbSize}
          />
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Signin);