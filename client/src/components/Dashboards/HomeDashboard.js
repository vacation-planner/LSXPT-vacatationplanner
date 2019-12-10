import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import HomeNavbar from './Navbar/HomeNavbar.js';
import Vacation from "./Calendar/index.js";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import CreateVacationForm from '../CreateVacation/CreateVacationForm.js';
import LeftSideBar from './LeftSideBar.js';
import Vacation from "./Vacations/index.js";
import CardHeaderTypes from "./Vacations/test.js";
import Dnd from "./Calendar/dragDrop.js";
import Events from "./Events/events.js";
import AddUsers from "./AddUsers/addUsers.js";


const styles = () => ({
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
        padding: '20px 0px',
        minHeight: 'calc(50vh - 9px)',
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
    main: {
        width: '100%',
        display: 'flex', // Fix IE 11 issue.
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 'calc(100vh - 65px)',
        backgroundColor: '#E2E2E2',
    },
    paper: {
        marginTop: '65px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        padding: '20px 0',
        backgroundColor: '#E2E2E2',
        minHeight: 'calc(100vh - 65px)',
        height: '600px',
    }
});

class HomeDashboard extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <HomeNavbar />
                <Paper className={classes.paper}>
                    {/* <Vacation /> */}
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
            </main>
        );
    }
}

export default withStyles(styles)(HomeDashboard);
