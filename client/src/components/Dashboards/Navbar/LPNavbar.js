import React from "react";
// import { fire } from "../../Auth/firebaseConfig";

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


// core components
import Button from "@material-ui/core/Button";
// import Button from "../../Material-UI/components/CustomButtons/Button.jsx";

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
        height: '61px',
        minHeight: '61px',
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
        width: "180px",
        position: "relative",
        fontWeight: "300",
        lineHeight: "1.4em",
        height: "40px",
        textDecoration: "none",
        minHeight: "25px",
        display: "inline-flex",
        fontSize: "2.0rem",
        borderRadius: "5%",
        textTransform: "none",
        whiteSpace: "nowrap",
        margin: "0px",
        color: "white",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        left: "calc(50% - 95px)",
        "&:hover,&:focus": {
            backgroundColor: "#D61C5B",
            textDecoration: "none",
            color: "white",
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
        color: "white",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "1.4rem",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        display: "inline-flex",
        width: '80px',
        height: '35px',
        "&:hover,&:focus": {
            textDecoration: "none",
            backgroundColor: "#AA1649",
            color: "white",
        },
        [theme.breakpoints.down(600)]: {
            width: "calc(100% - 30px)",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            textTransform: "none",
            fontSize: '1.75rem',
            color: 'black',
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
        height: 61,
        minHeight: '61px',
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

class LandingPageNavbar extends React.Component {
    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }

    handleClose = () => {
        this.setState({ anchorEl: null, mobileOpen: false });
    };

    render() {
        const { classes } = this.props;
        const { mobileOpen } = this.state;
        const drawer = (
            <div>
                <div className={classes.closeIconToolbar}>
                    {mobileOpen ? (
                        <div className={classes.closeButton}
                            onClick={this.handleDrawerToggle}><CloseIcon style={{ width: '22px', height: '22px', padding: '0px' }} /></div>
                    ) : null}
                </div>
                <div className={classes.hideDrawerButtons}>
                    <Divider />
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <Button
                                href={ROUTES.SIGNIN}
                                className={classes.navLink}
                                color="transparent"
                            >
                                Sign In
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
                                <MenuIcon style={{ width: '22px', height: '22px' }} />
                            </IconButton>
                        </Hidden>
                        <Button className={classes.logo} href="/">
                            Vacation Planner
                </Button>

                        <Hidden xsDown implementation="css">
                            <div>
                                <List className={classes.list}>
                                    <ListItem className={classes.listItem}>
                                        <Button
                                            href={ROUTES.SIGNIN}
                                            className={classes.navLink}
                                            color="transparent"
                                        >
                                            Sign In
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
                </nav>
            </div>
        );
    }
}

LandingPageNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPageNavbar);
