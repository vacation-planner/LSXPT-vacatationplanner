import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Redirect, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AppContext } from '../Context/AppContext.js';
import Navbar from '../Dashboards/Navbar';
import Footer from '../Material-UI/components/Footer/Footer.jsx';
import { ContentDiv } from '../StyledComponents';
import { fire } from "../Auth/firebaseConfig";
import * as ROUTES from "../../constants/routes";
import "../StyledComponents/LandingPage/landingPage.css";

class LandingPage extends Component {
    componentDidMount() {
        // Get Token
        // If Token exists good
        // Else make sure signed out
    }

    //************* Added temp signout ************************
    //**   this just gives us a temporary way to signout     **
    signOut = () => {
        fire.signOut();
        console.log("User logged out successfully");
       };
    
    render() {
        // Check if logged in
        // If logged In
        // return (
        //     <>
        //         <Redirect to='/dashboard' />
        //     </>
        // )

        // else
        return (
            <>
                <Navbar />
                <ContentDiv>
                    <header>
                        {/* Content image in background */}
                        <div>
                            <h2>Vacation Planner</h2>
                            <p>Some stuff about us</p>
                            <Link to={ROUTES.SIGNIN} className="button button__accent">
                  Sign up
                </Link>    
                <button>Sign up</button>
                <button
                onClick={this.signOut}>Temp Sign out</button>
                        </div>
                    </header>
                    
                </ContentDiv>

                {/* <Footer>
                    <h3>We are in footer</h3>
                    <h1>Hello</h1>
                </Footer> */}
                <footer className="footer">
                    <div className="footer-content">
                        <div className="contact">
                            <div>Contact Us</div>
                            <a href="mailto:lmlambdalabs@gmail.com">
                                <p>lmlambdalabs.com</p>
                            </a>
                            <p>1-800-888-4141</p>
                        </div>
                    </div>
                    <p className="copyright">
                        &copy; 2019 - Team Pedro
                    </p>
                </footer>
            </>
        );
    }
}

LandingPage.contextType = AppContext;

export default LandingPage;
