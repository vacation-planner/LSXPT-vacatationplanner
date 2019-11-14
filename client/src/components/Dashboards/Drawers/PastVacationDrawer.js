import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const styles = theme => ({
    nameDiv: {
        margin: '0px',
        textAlign: 'center',
        padding: '15px',
        color: 'black',
        backgroundColor: '#DDDDDD',
        fontSize: '1.5rem'
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
        this.setState({ [event.currentTarget.id]: true })
    }

    render() {
        const { classes } = this.props;
        const selected = {
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
                <List onClick={this.handleClose}>
                    {ListPastVacations.map((pastVacation, index) => (
                        <>
                            <ListItem
                                button
                                key={pastVacation.name}
                                id={pastVacation.name}
                                onClick={this.displayPastVacation}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </>
        );
    }
}

export default PastVacationDrawer;