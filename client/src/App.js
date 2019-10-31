import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import { AppContext } from './components/Context/AppContext.js';
import * as ROUTES from "../constants/routes";
import LandingPage from './components/LandingPage';
import Signin from "./Auth/Signin";
import { fire } from "./Auth/firebaseConfig";
import axios from "axios";
import Signin from "./Auth/Signin";


// ********* need heroku address ***********
//const URL = "https://?????.herokuapp.com/";
const URL = "http://localhost:5500/";

const AuthenticatedRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends Component {

    state = {
        authenticated: false,
        //currentUser: null,
        firstName: null,
        lastName: null,
        currentEmail: null,
        userUID: null,
        redirect: false
      };
    
      componentDidMount = () => {
        this.removeAuthListener = fire.onAuthStateChanged(user => {
          if (user) {
            // Last # of occurrence of Space
            return fire.currentUser
              .getIdToken()
              .then(idToken => {
                //let space = user.displayName.lastIndexOf(" ");
                axios.defaults.headers.common["Authorization"] = idToken;
                this.setState({
                  currentUser: user,
                  authenticated: true,
                  redirect: true,
                  currentEmail: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  userUID: user.uid
                });
                console.log("User uid: ", this.state.userUID)
                this.addCurrentUser(user);
              })
              .catch(err => console.log("error ", err));
    
            // If the user is the Authenticated use pass their information to the database
          } else {
            this.setState({
              currentUser: null,
              authenticated: false,
              redirect: false,
              currentEmail: null,
              balance: null,
              userUID: null
            });
          }
        });
      };

      //To sign out an get no error with firebase dropping the widget
  removeAuthListener: any;
  // Add current user method will grab the information from state create new user in our database
 
  addCurrentUser = () => {
    function newUser(firstName, lastName, email, uid) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.uid = uid;
    }
    const creds = new newUser(
      this.state.firstName,
      this.state.lastName,
      this.state.currentEmail,
      this.state.userUID
    );
    const endpoint = `${URL}api/users`;
    axios
      .post(endpoint, creds)
      .then(res => {
        console.log("User logged in successfully");
      })
      .catch(err => console.log("Error in getting user"));
  };
    render() {
        const { currentUser } = this.state;
        const { redirect } = this.state;
    
        // Defined homepage for route checks
       // const homepage = () => {
      //      return <Redirect to='/' />;
      //  };

        return (
<<<<<<< HEAD
        //     <div className="App">
        //        <Route exact path='/' component={LandingPage} />
        //        {/* Route for signin */}
        //        {/* Route for sign up */}
        //        {/* Route for user settings */}
        //        {/* Route for home dashboard */}
        //        {/* Implement more Routes as needed */}
        //    </div> 
        <div>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <AuthenticatedRoute
            authenticated={this.state.authenticated}
            path={ROUTES.DASHBOARD}
            component={Dashboard}
          />
        <Route
            exact
            path={ROUTES.SIGNIN}
            render={props => {
              return (
                <Signin user={currentUser} redirect={redirect} {...props} />
              );
            }}
          />
        </Switch>
      </div>
=======
            <div className="App">
                <Route exact path='/' component={LandingPage} />
                {/* <Route path='/SignIn' component={} /> */}
                {/* <Route path='/SignUp' component={} /> */}
                {/* Route for user settings */}
                {/* Route for home dashboard */}
                {/* Implement more Routes as needed */}
            </div>
>>>>>>> bbeeeb4bfffe41ad6238dbc7e2e413e89de4b583
        );
    }
}

App.contextType = AppContext;

export default withRouter(App);
