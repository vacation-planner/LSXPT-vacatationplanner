import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom';
// import { AppContext } from '../Context/AppContext';

const styles = theme => ({
    main: {
        width: '25%',
        maxWidth: '275px',
        display: 'block',
        backgroundColor: '#DDDDDD',
        // backgroundColor: '#BBC1C5',
        height: 'calc(100vh - 65px)',
        borderRight: '1px solid #BBC1C5',
        padding: '0px',
        margin: '0px',
        [theme.breakpoints.down(600)]: {
            display: 'none'
        }
    },
    list: {
        padding: '0px',
        margin: '0px',
        fontSize: '1.75rem'
    },
    listItemText: {
        fontSize: '1.75rem',
        padding: '12px'
    },
    listItemTextLayerTwo: {
        fontSize: '1.5rem',
        padding: '12px',
        paddingLeft: '25px'
    }
});

class HomeDrawer extends React.Component {
    state = {
        expandCurrentVacations: false,
        expandPastVacations: false,
        mobileOpen: false,
        currentVacations: [
            {
                name: 'test 1',
                location: 'Boca',
                startDate: 'June 27th 2020',
                endDate: 'July 4th 2020'
            },
            {
                name: 'test 2',
                location: 'Paris',
                startDate: 'November 27th 2019',
                endDate: 'December 4th 2019'
            },
            {
                name: 'I am the Mega Vacation',
                location: 'New York',
                startDate: 'April 15th 2020',
                endDate: 'April 24th 2020'
            }
        ],
        pastVacations: []
    };

    handleClick = event => {
        event.preventDefault();
        this.setState({
            [event.currentTarget.id]: !this.state[event.currentTarget.id]
        });
    };

    handleClose = () => {
        this.setState({
            mobileOpen: false
        })
    }

    selectCurrentVacation = () => {
        this.handleClose();
        this.setState({
            CurrentVacations: false
        });
    };

    selectPastVacation = () => {
        this.handleClose();
        this.setState({
            expandPastVacations: false
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <List className={classes.list}>
                    <ListItem
                        button
                        key="expandCurrentVacations"
                        id="expandCurrentVacations"
                        onClick={this.handleClick}
                        color="inherit"
                        style={!currentVacations.length ? { display: 'none' } : null}
                    >
                        <ListItemText primary="Current Vacations" />
                        {this.state.expandcurrentVacations ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Divider />
                    <Collapse in={this.state.expandcurrentVacations} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.currentVacations.map((currentVacation, index) => (
                                <>
                                    {/* Add Link for each vacation */}
                                        <ListItem
                                            button
                                            key={currentVacation.id}
                                            onClick={this.selectCurrentVacation}
                                        >
                                            <ListItemText
                                                id={currentVacation.id}
                                                currentVacationIndex={index}
                                                primary={currentVacation.name}
                                                classes={{ primary: classes.listItemTextLayerTwo }}
                                            />
                                        </ListItem>
                                    {/* </Link> */}
                                    <Divider />
                                </>
                            ))}
                        </List>
                    </Collapse>
                    <ListItem
                        button
                        key="pastVacations"
                        id="expandPastVacations"
                        onClick={this.handleClick}
                        color="inherit"
                        style={!pastVacations.length ? { display: 'none' } : null}
                    >
                        <ListItemText classes={{ primary: classes.listItemText }}primary="Past Vacations" />
                        {this.state.expandPastVacations ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Divider />
                    <Collapse in={this.state.expandPastVacations} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.pastVacations.map((pastVacation, index) => {
                                const id = team.id;
                                return (
                                    <>
                                    {/* Add Link for each vacation */}
                                            <ListItem
                                                button
                                                key={pastVacation.id}
                                                onClick={this.selectPastVacation}
                                            >
                                                <ListItemText
                                                    id={pastVacation.id}
                                                    pastVacationIndex={index}
                                                    primary={team.name}
                                                    classes={{ primary: classes.listItemTextLayerTwo }}
                                                />
                                            </ListItem>
                                        {/* </Link> */}
                                        <Divider />
                                    </>
                                );
                            })}
                        </List>
                    </Collapse>
                </List>
            </main>
        );
    }
}

HomeDrawer.contextType = AppContext;

export default withStyles(styles)(HomeDrawer);
