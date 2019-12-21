import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import { Link } from 'react-router-dom';

const styles = theme => ({
    nameDiv: {
        margin: '0px',
        textAlign: 'center',
        padding: '15px',
        // color: 'black',
        color: 'white',
        // backgroundColor: '#DDDDDD',
        backgroundColor: 'black',
        fontSize: '1.75rem'
    },
    list: {
        padding: 0,
        margin: 0,
        border: 0
    },
    listItemText: {
        fontSize: '1.75rem',
    },
});

class PastVacationDrawer extends React.Component {
    state = {
        vacationDetails: true,
        calendar: false,
        expenses: false,
        mobileOpen: false,
    };

    handleClose = () => {
        this.setState({
            mobileOpen: false
        })
    }

    displayPastVacation = event => {
        event.preventDefault();
        this.setState({
            vacationDetails: false,
            calendar: false,
            expenses: false
        })
        this.setState({
            [event.currentTarget.id]: true
        })
    }

    render() {
        const { classes } = this.props;
        const selectedDrawer = {
            backgroundColor: 'white'
        };

        const ListPastVacations = [
            { name: 'vacationDetails', text: 'Vacation Details' },
            { name: 'calendar', text: 'Calendar' },
            { name: 'expenses', text: 'Expenses' }
        ];

        return (
            <>
                <div className={classes.nameDiv}>
                    past vacation name {/*  Name of Past Vacation Here */}
                </div>
                <List onClick={this.handleClose} className={classes.list}>
                    {ListPastVacations.map((pastVacation, index) => (
                        <>
                            <ListItem
                                button
                                key={pastVacation.name}
                                id={pastVacation.name}
                                onClick={this.displayPastVacation}
                                style={this.state[pastVacation] ? selectedDrawer : null}
                            >
                                <ListItemText classes={{ primary: classes.listItemText }} primary={pastVacation.text} />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </>
        );
    }
}

export default withStyles(styles)(PastVacationDrawer);