import React from 'react';
import { fire } from "../Auth/firebaseConfig";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import HomeNavbar from './Navbar/HomeNavbar.js';
<<<<<<< HEAD
// import LeftSideBar from './LeftSideBar.js';
import Vacation from "./Calendar/index.js";
=======

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { AppContext } from '../Context/AppContext.js';
import CreateVacationForm from '../CreateVacation/CreateVacationForm.js';
import LeftSideBar from './LeftSideBar.js';
>>>>>>> 84b553981bcff936206e753180c38394426f21f3




const styles = theme => ({
    card: {
        width: '20%',
        minWidth: 300,
        margin: '20px',
        minHeight: 325,
        padding: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardActions: {
        padding: 0,
        margin: 0,
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(50vh)',
        height: 'auto',
        backgroundColor: '#E91E63',
        width: '100%',
        textAlign: 'left',
    },
    cardContent: {
        padding: 0,
        margin: 0,
    },
    cardFeatures: {
        fontSize: '2.0rem',
        display: 'inline-block',
        paddingBottom: '4px',
        borderBottom: '1px solid black',
        width: '91px',
        marginBottom: '15px',
    },
    cardText: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        width: '100%',
    },
    cardTitle: {
        fontSize: '2.5rem',
        marginBottom: '25px',
        width: '100%',
        textAlign: 'center',
    },
    innerContainer: {
        marginTop: 65,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 65px)',
    },
    main: {
        width: '100%',
        display: 'flex', // Fix IE 11 issue.
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#E2E2E2',
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#E2E2E2',
        // minHeight: 'calc(100vh - 65px)',
        // height: '600px',
    },
    instructions: {
        height: '42vh',
        minHeight: 300,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            paddingTop: 20
        }
    },
    step: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0px 10px',
        minHeight: '80px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            borderBottom: '1px solid #333',
            paddingBottom: 20
        }
    },
    number: {
        fontSize: '1.6rem',
    },
    text: {
        fontSize: '1.5rem'
    },
});

class HomeDashboard extends React.Component {
    state = {
        currentVacationMenu: false,
        pastVacationMenu: false,
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
<<<<<<< HEAD
                <HomeNavbar />
                <Paper className={classes.paper}>
                    {/* <LeftSideBar /> */}
                   {/*  <h1>Test 2</h1> */}
                    <Vacation>
                        </Vacation>
                </Paper>
=======
                <HomeNavbar 
                    data={this.state}
                />
                <div className={classes.innerContainer}>
                    <div className={classes.instructions}>
                        <div className={classes.step}>
                            <p className={classes.number}>1.</p>
                            <p className={classes.text}>Choose a vacation option below</p>
                        </div>
                        <div className={classes.step}>
                            <p className={classes.number}>2.</p>
                            <p className={classes.text}>Enter a few details</p>
                        </div>
                        <div className={classes.step}>
                            <p className={classes.number}>3.</p>
                            <p className={classes.text}>Manage your perfect vacation experience</p>
                        </div>
                    </div>
                    <Paper className={classes.paper}>
                        <div className={classes.cardContainer}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <h1 className={classes.cardTitle}>Basic Vacation</h1>
                                    <p className={classes.cardFeatures}>Features</p>
                                    <p className={classes.cardText}>- Item 1</p>
                                    <p className={classes.cardText}>- Item 2</p>
                                    <p className={classes.cardText}>- Item 3</p>
                                    <p className={classes.cardText}>- Item 4</p>
                                </CardContent>

                                <CardActions className={classes.cardActions}>
                                    <CreateVacationForm vacationType="basic" />
                                </CardActions>
                            </Card>


                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <h1 className={classes.cardTitle}>Premium Vacation</h1>
                                    <p className={classes.cardFeatures}>Features</p>
                                    <p className={classes.cardText}>- Share your vacation with other people</p>
                                    <p className={classes.cardText}>- Item 2</p>
                                    <p className={classes.cardText}>- Item 3</p>
                                    <p className={classes.cardText}>- Plus all basic features</p>
                                </CardContent>

                                <CardActions className={classes.cardActions}>
                                    <CreateVacationForm vacationType="premium" />

                                </CardActions>
                            </Card>
                        </div>
                    </Paper>
                </div>
>>>>>>> 84b553981bcff936206e753180c38394426f21f3
            </main>
        );
    }
}

HomeDashboard.contextType = AppContext;

export default withStyles(styles)(HomeDashboard);
