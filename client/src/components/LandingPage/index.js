import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppContext } from '../Context/AppContext.js';
import Navbar from '../Dashboards/Navbar/LPNavbar.js';
import * as ROUTES from "../../constants/routes";
import { ContentDiv, LandingPageHeader, LandingPageH2, LandingPageFooter } from '../StyledComponents';
import Button from "@material-ui/core/Button";

const headerLinksStyle = theme => ({
    navLinkLandingPage: {
      color: "white",
      position: "relative",
      padding: "15px, 2rem",
      fontWeight: "400",
      fontSize: "2.3rem",
      lineHeight: "20px",
      textDecoration: "none",
      marginTop: "30px",
      display: "inline-flex",
      borderRadius: '5%',
      width: '140px',
      height: '40px',
      backgroundColor: "#e91e63",
      marginBottom: '25px',
      "&:hover,&:focus": {
        backgroundColor: "#AA1649",
        color: "white",
        textDecoration: "none",
      },
      "& .fab,& .far,& .fal,& .fas,& .material-icons": {
        position: "relative",
        top: "2px",
        marginTop: "-4px",
        marginRight: "4px",
        marginBottom: "0px",
        fontSize: "1.25rem"
      },
      "& svg": {
        marginRight: "3px",
        width: "20px",
        height: "20px"
      }
    },
  });

class LandingPage extends Component {
    render() {
        const { classes } = this.props;
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
                            href={ROUTES.SIGNIN}
                            className={classes.navLinkLandingPage}
                            >
                            Sign in
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