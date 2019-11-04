import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt_decode from 'jwt-decode';
import { AppContext } from '../Context/AppContext.js';
import Navbar from '../Dashboards/Navbar';
import Footer from '../Material-UI/components/Footer/Footer.jsx';
import { ContentDiv } from '../StyledComponents';
import { fire } from "../Auth/firebaseConfig";
import * as ROUTES from "../../constants/routes";
import "../StyledComponents/LandingPage/landingPage.css";
import { ContentDiv, LandingPageHeader, LandingPageH2, LandingPageFooter } from '../StyledComponents';
import Button from '../Material-UI/components/CustomButtons/Button.jsx';
import headerLinksStyle from '../Material-UI/assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx';

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
        const { classes } = this.props;

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
                   <LandingPageHeader>
                        <LandingPageH2>
                            Welcome to Vacation Planner
                        </LandingPageH2>
                        <p>
                            Do you want a fast, east way to plan your vacation?  We can help with that!
                            {/* Planning a vacation with friends or family can become very complicated and stressful.  Using Vacation Planner can allow everyone to plan out the vacation ahead of time, so there everyone can enjoy their vacation without arguments and anxiety. */}
                        </p>
                        <Link to={ROUTES.SIGNIN} className="button button__accent">
                            Sign up
                        </Link>   
                        <Button
                            href="/SignUp"
                            className={classes.navLinkLandingPage}
                            >
                            Sign up
                        </Button>
                        <button
                            onClick={this.signOut}>Temp Sign out</button>
                    </LandingPageHeader>
                </ContentDiv>

                <LandingPageFooter>
                    Contact Us at vacationplannerlx@gmail.com
                </LandingPageFooter>
            </>
        );
    }
}

LandingPage.contextType = AppContext;

export default withStyles(headerLinksStyle)(LandingPage);
