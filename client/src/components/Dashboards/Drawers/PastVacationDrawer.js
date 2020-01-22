import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Pedro from '../../../images/Pedro.jpg'; //Delete Later

const styles = theme => ({
    buttonStyling: {
        fontSize: '1.75rem',
        width: '100%',
        textTransform: 'none',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '8px 16px'
    },
    nameDiv: {
        margin: '0px',
        textAlign: 'center',
        padding: '15px',
        color: 'white',
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
    Pedro: {
        width: '80%',
        height: '80%',
        position: 'fixed',
        zIndex: 99999999,
        left: 200,
        top: 80,
    }, //Delete Pedro later
});

class PastVacationDrawer extends React.Component {
    state = {
        vacationDetails: true,
        calendar: false,
        expenses: false,
        mobileOpen: false,
        pastVacation: this.props.pastVacation,
        batman: false, // Delete later
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
        this.props.displayPastVacationContent(event);
    }

    makePremium = () => { //Delete later
        console.log(this.state.batman)
        this.setState({
            batman: !this.state.batman
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
            { name: 'events', text: 'Events' },
            { name: 'expenses', text: 'Expenses' }
        ];

        return (
            <>
                <div className={classes.nameDiv}>
                    {this.state.pastVacation.title || 'test'}
                </div>
                <List onClick={this.handleClose} className={classes.list}>
                    {ListPastVacations.map((pastVacation, index) => {
                        const { name } = pastVacation
                        return (
                            <React.Fragment key={pastVacation.name}>
                                <ListItem
                                    button
                                    id={pastVacation.name}
                                    onClick={this.displayPastVacation}
                                    style={this.state[name] ? selectedDrawer : null}
                                >
                                    <ListItemText classes={{ primary: classes.listItemText }} primary={pastVacation.text} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )
                    })}
                    <Button className={classes.buttonStyling} onClick={() => this.makePremium()}>Upgrade to Premium</Button>
                </List>
                {this.state.batman ? <img src={Pedro} className={classes.Pedro} /> : null }  {/*Delete Later*/}
            </> 
        );
    }
}

export default withStyles(styles)(PastVacationDrawer);