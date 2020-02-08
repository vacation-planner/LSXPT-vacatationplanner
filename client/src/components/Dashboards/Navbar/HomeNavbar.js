import React from "react";
import { fire } from "../../Auth/firebaseConfig";
// import { Link } from "react-router-dom";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

// Firebase things
import * as ROUTES from "../../../constants/routes";
//import { fire } from "../../Auth/firebaseConfig";

// core components
import Button from "../../Material-UI/components/CustomButtons/Button.jsx";

import CurrentVacationDrawer from '../Drawers/CurrentVacationDrawer.js';
import HomeDrawer from '../Drawers/HomeDrawer.js';
import PastVacationDrawer from '../Drawers/PastVacationDrawer.js';

import { AppContext } from '../../Context/AppContext';

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
         backgroundColor: "#E91E63",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            zIndex: theme.zIndex.drawer + 1
        }
    },
    closeButton: {
        cursor: "pointer",
        padding: 15,
        paddingLeft: 35,
        fontSize: "2rem",
    },
    closeIconToolbar: {
        height: '64px',
        display: "flex",
        justifyContent: "space-betwen",
        alignItems: 'center',
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: "100%",  
         backgroundColor: "#eee", 
        color: 'black',
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth
        }
    },
    hideDrawerButtons: {
        [theme.breakpoints.up(600)]: {
            display: 'none'
        },
    },
    list: {
        [theme.breakpoints.up("sm")]: {
            WebkitBoxAlign: "center",
            MsFlexAlign: "center",
            alignItems: "center",
            WebkitBoxOrient: "horizontal",
            WebkitBoxDirection: "normal",
            MsFlexDirection: "row",
            flexDirection: "row"
        },
        [theme.breakpoints.down(600)]: {
            display: "block"
        },
        marginTop: "0px",
        display: "flex",
        paddingLeft: "0",
        marginBottom: "0",
        listStyle: "none",
        padding: "0"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        marginLeft: "15px",
        [theme.breakpoints.down(600)]: {
            marginLeft: '0px',
            paddingLeft: '5px',
            width: '100%',
            borderBottom: '1px solid #C2C2C2',
            borderRight: '1px solid #C2C2C2',
            backgroundColor: '#DDDDDD',
            "& ul": {
                maxHeight: "400px",
                overflow: "scroll"
            },
        }
    },
    logo: {
        backgroundColor: "#AA1649",
        width: "190px",
        position: "relative",
        fontWeight: "300",
        lineHeight: "1.5em",
        height: "44px",
        textDecoration: "none",
        minHeight: "32px",
        display: "inline-flex",
        fontSize: "2.2rem",
        borderRadius: "5%",
        textTransform: "none",
        whiteSpace: "nowrap",
        margin: "0px",
        color: "white",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        left: "calc(50% - 95px)",
        "&:hover,&:focus": {
            backgroundColor: "#D61C5B"
        },
        [theme.breakpoints.down(600)]: {
            position: 'relative',
            left: 'calc(50% - 95px - 37px)'
        },
        [theme.breakpoints.down(400)]: {
            display: "none"
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
    navLink: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "1.5rem",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        display: "inline-flex",
        "&:hover,&:focus": {
            backgroundColor: "#AA1649"
        },
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
            position: "relative",
            top: "2px",
            marginTop: "-4px",
            marginRight: "4px",
            marginBottom: "0px",
            fontSize: "1.25rem"
        },
        [theme.breakpoints.down(600)]: {
            width: "calc(100% - 30px)",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            textTransform: "none",
            fontSize: '1.75rem',
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        },
        "& svg": {
            marginRight: "3px",
            width: "20px",
            height: "20px"
        }
    },
    root: {
        flexGrow: 1
    },
    toolbar: {
        height: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down(600)]: {
            justifyContent: 'flex-start'
        },
    },
    toolbarRightContent: {
        display: "flex",
        alignItems: "center"
    },
});

class HomeNavbar extends React.Component {
    state = {
        mobileOpen: false,
    };

    componentDidMount() {
        const { currentVacationMenu, pastVacationMenu, currentVacationTitle, currentVacationIndex, currentVacationId, pastVacationTitle, pastVacationIndex, pastVacationId } = this.props.data;

        this.setState({
            currentVacationMenu,
            pastVacationMenu,
            currentVacationTitle,
            currentVacationIndex,
            currentVacationId,
            pastVacationTitle,
            pastVacationIndex,
            pastVacationId,
        });
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }

    handleClose = () => {
        this.setState({ mobileOpen: false });
    };

    signOut = () => {
        this.context.signOut();
        fire.signOut();
        console.log("User logged out successfully");
    };

    render() {
        const { classes } = this.props;
        const { mobileOpen, currentVacationMenu, pastVacationMenu } = this.state;

        const drawer = (
            <div>
                <div className={classes.closeIconToolbar}>
                    {mobileOpen ? (
                        <div className={classes.closeButton}
                            onClick={this.handleDrawerToggle}>
                            <CloseIcon style={{ width: '25px', height: '25px', padding: '0px' }} />
                        </div>
                    ) : null}
                </div>
                {!currentVacationMenu && !pastVacationMenu && (
                    <>
                        <Divider />
                        <HomeDrawer
                            currentVacations={this.context.state.myCurrentVacations}
                            pastVacations={this.context.state.myPastVacations}
                        />
                    </>
                )}
                {currentVacationMenu && !pastVacationMenu && (
                    <CurrentVacationDrawer
                        currentVacations={this.context.state.myCurrentVacations}
                        pastVacations={this.context.state.myPastVacations}
                        currentVacation={this.context.state.myCurrentVacations[this.state.currentVacationIndex] || this.context.state.myCurrentVacations[this.context.state.myCurrentVacations.length - 1]}
                        displayCurrentVacationContent={this.props.displayCurrentVacationContent}
                    />
                )}
                {!currentVacationMenu && pastVacationMenu && (
                    <PastVacationDrawer
                        currentVacations={this.context.state.myCurrentVacations}
                        pastVacations={this.context.state.myPastVacations}
                        pastVacation={this.context.state.myPastVacations[this.state.pastVacationIndex]}
                        displayPastVacationContent={this.props.displayPastVacationContent}
                    />
                )}
                <div className={classes.hideDrawerButtons}>
                    <Divider />
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <Button
                                href={ROUTES.DASHBOARDS}
                                className={classes.navLink}
                                color="transparent"
                            >
                                Home
                    </Button>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Button
                                href={ROUTES.LANDING}
                                className={classes.navLink}
                                color="transparent"
                                onClick={this.signOut}
                            >
                                Sign Out
                    </Button>
                        </ListItem>
                    </List>
                </div>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Hidden smUp>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Button className={classes.logo} href="/dashboards">
                            Vacation Planner
                    </Button>

                        <Hidden xsDown implementation="css">
                            <div>
                                <List className={classes.list}>
                                    <ListItem className={classes.listItem}>
                                        <Button
                                            href={ROUTES.DASHBOARDS}
                                            className={classes.navLink}
                                            color="transparent"
                                        >
                                            Home
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button
                                            onClick={this.signOut}
                                            href={ROUTES.LANDING}
                                            className={classes.navLink}
                                            color="transparent"
                                        >
                                            Sign Out
                                        </Button>
                                    </ListItem>
                                </List>
                            </div>
                        </Hidden>
                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={'right'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            </div>
        );
    }
}

HomeNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

HomeNavbar.contextType = AppContext;

export default withStyles(styles)(HomeNavbar);