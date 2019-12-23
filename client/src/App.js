import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fire } from './components/Auth/firebaseConfig';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/Context/AppContext.js';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage';
import HomeDashboard from './components/Dashboards/HomeDashboard.js';
import CurrentVacationDashboard from './components/Dashboards/CurrentVacationDashboard.js';
import PastVacationDashboard from './components/Dashboards/PastVacationDashboard.js';
import CreateVacationDetails from './components/CreateVacation/CreateVacationDetails.js';
import Signin from './components/Auth/Signin';

import axios from 'axios';

//const URL = 'https://vacationplannerlx.herokuapp.com/';
const URL = 'http://localhost:5500/';

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
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

class App extends Component {
    state = {
        authenticated: false,
        currentUser: null,
        firstName: null,
        lastName: null,
        currentEmail: null,
        userUID: null,
        redirect: false,
        vacationsId: "",
    };

    componentDidMount = () => {
        // this checks the url for any parameters and returns empty if it is
        let vacationsId = this.getUrlParam('id','Empty');
        // if we do have a param, it means the user has arrived from a link
        // in the invitation email we sent them
        if (vacationsId !== 'Empty') {
            // save the id to local storage
            localStorage.setItem('vacationsId', vacationsId);
        }
        // the app redirects and loses the parameter, so i saved it to local storage
       // console.log('vacationsId: ', vacationsId)

         this.removeAuthListener = fire.onAuthStateChanged(user => {
            if (user) {
                // Last # of occurrence of Space
                return fire.currentUser
                    .getIdToken()
                    .then(idToken => {
                        let space = user.displayName.lastIndexOf(' ');
                        axios.defaults.headers.common[
                            'Authorization'
                        ] = idToken;
                        this.setState({
                            currentUser: user,
                            authenticated: true,
                            redirect: true,
                            currentEmail: user.email,
                            firstName: user.displayName.substring(0, space),
                            lastName: user.displayName.substring(space + 1),
                            userUID: user.uid
                        });
                        console.log('User uid: ', this.state.userUID);
                        this.context.getUserID(this.state.userUID);
                        this.context.getVacations();
                        this.addCurrentUser(user);
                    })
                    .catch(err => console.log('error ', err));

                // If the user is the Authenticated use pass their information to the database
            } else { 
                this.setState({
                    currentUser: null,
                    authenticated: false,
                    redirect: false,
                    currentEmail: null,
                    userUID: null
                });
             } 
         }); 
    };

    // this function grabs any parameter in the url
    getUrlVars = () => {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    };

    // this function keeps it from crashing if there is no parameter
    getUrlParam = (parameter,defaultvalue) => {
        let urlparameter = defaultvalue;
        if(window.location.href.indexOf(parameter) > -1){
            urlparameter = this.getUrlVars()[parameter];
            }
        return urlparameter;
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
                console.log('User logged in successfully');
            })
            .catch(err => console.log('Error in getting user'));
    };
    render() {
        const { currentUser } = this.state;
        const { redirect } = this.state;

        // Defined homepage for route checks
        // const homepage = () => {
        //      return <Redirect to='/' />;
        //  };

        return (
            <div className="App">
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <AuthenticatedRoute
                        authenticated={this.state.authenticated}
                        exact
                        path={ROUTES.DASHBOARDS}
                        component={HomeDashboard}
                    />
                    <Route
                        authenticated={this.state.authenticated}
                        path={ROUTES.CREATEVACATIONDETAILS}
                        component={CreateVacationDetails}
                    />
                    <Route
                        authenticated={this.state.authenticated}
                        path={ROUTES.CURRENTVACATIONSDASHBOARDS}
                        component={CurrentVacationDashboard}
                    />
                    <Route
                        authenticated={this.state.authenticated}
                        path={ROUTES.PASTVACATIONSDASHBOARDS}
                        component={PastVacationDashboard}
                    />
                    <Route
                        exact
                        path={ROUTES.SIGNIN}
                        render={props => {
                            return (
                                <Signin
                                    user={currentUser}
                                    redirect={redirect}
                                    {...props}
                                />
                            );
                        }}
                    />
                   {/*  <Route
                        path={ROUTES.LANDING}
                    /> */}
                </Switch>
            </div>
        );
    }
}

App.contextType = AppContext;

export default withRouter(App);
