import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as ROUTES from "../../../constants/routes";
import { Redirect } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { fire } from "../../Auth/firebaseConfig";

// core components
import Header from '../../Material-UI/components/Header/Header';
import Button from '../../Material-UI/components/CustomButtons/Button.jsx';
import { Link } from "@material-ui/core";

// Navbar Styles pulled from here
import navbarsStyle from '../../Material-UI/assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx';

class SectionNavbars extends React.Component {
   
    signOut = () => {
        fire.signOut();
        console.log("User logged out successfully");
       };

    render() {
        
 
        
        const { classes } = this.props;
        return (
            <Header
                brand="Vacation Planner"
                color="rose"
                links={
                    <div className={classes.collapse + ' ' + classes.toolbarRightContent}>
                        <List className={classes.list + ' ' + classes.mrAuto}>
                            <ListItem className={classes.listItem}>
                           {/*  <Link
                                component={RouterLink}
                                to={ROUTES.SIGNIN}
                                style={{ textDecoration: "none" }}
                            >Sign in */}
                                 <Button
                                    href="#pablo"
                                    className={classes.navLink}
                                    onClick={e => e.preventDefault()}
                                    color="transparent"
                                    >
                                    Sign In
                                </Button> 
                                {/* </Link> */}
                                
                            </ListItem>

                            <ListItem className={classes.listItem}>
                                <Button
                                    href="#pablo"
                                    className={classes.navLink}
                                    onClick={e => e.preventDefault()}
//                                  onClick={this.signOut}
                                    color="transparent"
                                    >
                                    Sign Up
                                </Button>
                            </ListItem>
                        </List>
                    </div>
                }
            />
        );
    }
}

export default withStyles(navbarsStyle)(SectionNavbars);
