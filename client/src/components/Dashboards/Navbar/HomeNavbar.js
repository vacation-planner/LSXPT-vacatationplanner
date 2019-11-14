import React from "react";
import { Link } from "react-router-dom";

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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import AccountBox from "@material-ui/icons/AccountBox";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

// Firebase things
import * as ROUTES from "../../../constants/routes";
import { fire } from "../../Auth/firebaseConfig";

// core components
import Button from "../../Material-UI/components/CustomButtons/Button.jsx";

import CurrentVacationDrawer from '../Drawers/CurrentVacationDrawer.js';
import HomeDrawer from '../Drawers/HomeDrawer.js';
import PastVacationDrawer from '../Drawers/PastVacationDrawer.js';

import { AppContext } from '../../Context/AppContext';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
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
        fontSize: "2rem"
    },
    drawerPaper: {
        width: "100%",
        backgroundColor: "#eee",
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    list: {
        [theme.breakpoints.up("md")]: {
            WebkitBoxAlign: "center",
            MsFlexAlign: "center",
            alignItems: "center",
            WebkitBoxOrient: "horizontal",
            WebkitBoxDirection: "normal",
            MsFlexDirection: "row",
            flexDirection: "row"
        },
        [theme.breakpoints.down("sm")]: {
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
        [theme.breakpoints.down("sm")]: {
            "& ul": {
                maxHeight: "400px",
                overflow: "scroll"
            },
            width: "100%",
            "&:not(:last-child)": {
                "&:after": {
                    width: "calc(100% - 30px)",
                    content: '""',
                    display: "block",
                    height: "1px",
                    marginLeft: "15px",
                    backgroundColor: "#495057"
                }
            }
        }
    },
    selected: {
        color: "white",
        borderBottom: "1px solid white",
        borderRadius: 0
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
            left: "0px"
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
        // backgroundColor: '#AA1649',
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "1.5rem",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        // width: '190px',
        display: "inline-flex",
        "&:hover,&:focus": {
            //   backgroundColor: "#D61C5B"
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
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
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
    nested: {
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: 40
    },
    toolbar: {
        height: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        textDecoration: "none",
        fontWeight: "700",
        marginTop: "30px",
        marginBottom: "25px",
        minHeight: "32px",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`
    },
    toolbarRightContent: {
        display: "flex",
        alignItems: "center"
    },
    toolbarLeftContent: {
        display: "flex",
        alignItems: "center"
    },
    // account icon
    accountIcon: {
        fontSize: "1.7rem"
    }
});

class HomeNavbar extends React.Component {
    state = {
        mobileOpen: false,
        testCurrent: this.context.state.testCurrent,
        testPast: this.context.state.testPast
    };

    handleDrawerToggle() {
        this.setState({ 
            mobileOpen: !this.state.mobileOpen
        });
    }

    handleClose = () => {
        this.setState({ anchorEl: null, mobileOpen: false });
    };

    signOut = () => {
        fire.signOut();
        console.log("User logged out successfully");
    };

    render() {
        const { classes, currentVacations, pastVacations } = this.props;
        const { mobileOpen, testCurrent, testPast } = this.state;

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    {mobileOpen ? (
                        <CloseIcon
                            className={classes.closeButton}
                            onClick={this.handleDrawerToggle}
                        />
                    ) : null}
                </div>
                <Divider />
                {!testCurrent && !testPast && (
                    <HomeDrawer
                        currentVacations={this.context.state.currentVacations}
                        pastVacations={this.context.state.pastVacations}
                    />
                )}
                {testCurrent && !testPast && (
                    <CurrentVacationDrawer
                        currentVacations={this.context.state.currentVacations}
                        pastVacations={this.context.state.pastVacations}
                    />
                )}
                {!testCurrent && testPast && (
                    <PastVacationDrawer
                        currentVacations={this.context.state.currentVacations}
                        pastVacations={this.context.state.pastVacations}
                    />
                )}
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
                        <Button className={classes.logo} href="/">
                            Vacation Planner
                    </Button>

                        <Hidden smDown implementation="css" className={classes.hidden}>
                            <div className={classes.collapse}>
                                <div
                                    className={classes.collapse + " " + classes.toolbarRightContent}
                                >
                                    <List className={classes.list + " " + classes.mrAuto}>
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
                                            >
                                                Sign Out
                                        </Button>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </Hidden>
                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                    {/* <Hidden mdUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={"left"}
                            open={this.state.mobileOpen}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            onClose={this.handleDrawerToggle}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.closeButtonDrawer}
                            >
                                <CloseIcon />
                            </IconButton>
                            <div className={classes.appResponsive}>{links}</div>
                        <div className={classes.appResponsive}>{links2}</div>
                        </Drawer>
                    </Hidden> */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={'left'}
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
            // <Header
            //     color="rose"
            //     brand="Vacation Planner"
            //     links={
            //         <div
            //             className={
            //                 classes.collapse + ' ' + classes.toolbarRightContent
            //             }
            //         >
            //             <List className={classes.list + ' ' + classes.mrAuto}>
            //                 <ListItem className={classes.listItem}>
            //                     <Button
            //                         href={ROUTES.SIGNIN}
            //                         className={classes.navLink}
            //                         color="transparent"
            //                     >
            //                         Sign Out
            //                     </Button>
            //                 </ListItem>
            //             </List>
            //         </div>
            //     }
            //     links2={
            //         <div
            //             className={
            //                 classes.collapse + ' ' + classes.toolbarRightContent
            //             }
            //         >
            //             <List className={classes.list + ' ' + classes.mrAuto}>
            //                 <ListItem className={classes.listItem}>
            //                     <Button
            //                         href={ROUTES.SIGNIN}
            //                         className={classes.navLink}
            //                         color="transparent"
            //                     >
            //                         Shit
            //                     </Button>
            //                 </ListItem>
            //             </List>
            //         </div>
            //     }
            // />
        );
    }
}

HomeNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

HomeNavbar.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(HomeNavbar);
