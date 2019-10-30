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
import { ContentDiv, LandingPageHeader } from '../StyledComponents';
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
                            <h2>Vacation Planner</h2>
                            <p>Some stuff about us</p>
                            <Button
                                href="/SignUp"
                                className={classes.navLinkLandingPage}
                                // onClick={e => e.preventDefault()}
                                color="transparent"
                                >
                                Sign up
                            </Button>
                    </LandingPageHeader>
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
                        &copy; 2019 - League Manager Team
                    </p>
                </footer>
            </>
        );
    }
}

LandingPage.contextType = AppContext;

// export default LandingPage;
export default withStyles(headerLinksStyle)(LandingPage);
