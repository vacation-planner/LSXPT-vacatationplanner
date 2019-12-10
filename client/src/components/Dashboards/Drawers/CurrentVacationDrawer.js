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

class CurrentVacationDrawer extends React.Component {
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

    displayCurrentVacation = event => {
        event.preventDefault();
        this.setState({
            vacationDetails: false,
            calendar: false,
            expenses: false
        });
        this.setState({
            [event.currentTarget.id]: true
        });
    };

    render() {
        const { classes } = this.props;
        const selectedDrawer = {
            backgroundColor: 'white'
        };

        const ListCurrentVacations = [
            { name: 'vacationDetails', text: 'Vacation Details' },
            { name: 'calendar', text: 'Calendar' },
            { name: 'expenses', text: 'Expenses' }
        ];

        return (
            <>
                <div className={classes.nameDiv}>
                    current vacation name {/*  Name of Current Vacation Here */}
                </div>
                <List onClick={this.handleClose} className={classes.list}>
                    {ListCurrentVacations.map((currentVacation, index) => (
                        <>
                            <ListItem
                                button
                                key={currentVacation.name}
                                id={currentVacation.name}
                                onClick={this.displayCurrentVacation}
                                style={this.state[currentVacation] ? selectedDrawer : null}
                            >
                                <ListItemText classes={{ primary: classes.listItemText }} primary={currentVacation.text} />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </>
        );
    }
}

export default withStyles(styles)(CurrentVacationDrawer);