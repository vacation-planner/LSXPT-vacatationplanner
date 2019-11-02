import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// core components
import Header from '../../Material-UI/components/Header/Header';
import Button from '../../Material-UI/components/CustomButtons/Button.jsx';

// Navbar Styles pulled from here
import navbarsStyle from '../../Material-UI/assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx';

class SectionNavbars extends React.Component {
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
                                <Button
                                    href="/SignIn"
                                    className={classes.navLink}
                                    // onClick={e => e.preventDefault()}
                                    color="transparent"
                                    >
                                    Sign In
                                </Button>
                            </ListItem>

                            <ListItem className={classes.listItem}>
                                <Button
                                    href="/SignUp"
                                    className={classes.navLink + ' ' + classes.navLinkRight}
                                    // onClick={e => e.preventDefault()}
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
