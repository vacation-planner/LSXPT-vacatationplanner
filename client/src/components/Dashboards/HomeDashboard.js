import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import HomeNavbar from './Navbar/HomeNavbar.js';
import LeftSideBar from './LeftSideBar.js';

const styles = () => ({
    main: {
        width: '100%',
        display: 'flex', // Fix IE 11 issue.
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 'calc(100vh - 65px)',
        backgroundColor: '#E2E2E2',
    },
    paper: {
        marginTop: '64px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#E2E2E2',

        // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
        //     3}px ${theme.spacing.unit * 3}px`
    }
});

class HomeDashboard extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <HomeNavbar />
                <Paper className={classes.paper}>
                    {/* <LeftSideBar /> */}
                    <h1>Test 2</h1>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(HomeDashboard);