import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt_decode from 'jwt-decode';
import { AppContext } from '../Context/AppContext.js';
import Navbar from '../Dashboards/Navbar';
import { ContentDiv, LandingPageHeader, LandingPageH2, LandingPageFooter } from '../StyledComponents';
import Button from '../Material-UI/components/CustomButtons/Button.jsx';
import headerLinksStyle from '../Material-UI/assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx';

class LandingPage extends Component {
    componentDidMount() {
        // Get Token
        // If Token exists good
        // Else make sure signed out
    }

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
                        </p>
                            <Button
                                href="/SignUp"
                                className={classes.navLinkLandingPage}
                                >
                                Sign up
                            </Button>
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
