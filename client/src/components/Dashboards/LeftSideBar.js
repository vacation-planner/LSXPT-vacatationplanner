import React from 'react';
import { fire } from "../Auth/firebaseConfig";

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

class LeftSideBar extends React.Component {
    state = {
        expandCurrentVacations: false,
        expandPastVacations: false,
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
        ]
    };

    handleClick = event => {
        event.preventDefault();
        this.setState({
            [event.currentTarget.id]: !this.state[event.currentTarget.id]
        });
    };

    selectCurrentVacation = () => {
        this.setState({
            expandCurrentVacations: false
        });
    };

    selectPastVacation = () => {
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
                        key="currentVacations"
                        id="expandCurrentVacations"
                        onClick={this.handleClick}
                        color="inherit"
                    >
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Current Vacations"
                        />
                        {this.state.expandCurrentVacations ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )}
                    </ListItem>

                    <Divider />

                    <Collapse
                        in={this.state.expandCurrentVacations}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {this.state.currentVacations.map((currentVacation, index) => (
                                <>
                                    {/* <Link > Add Link to each vacation */}
                                        <ListItem
                                            button
                                            onClick={this.selectCurrentVacation}
                                            key={currentVacation.id}
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
                    >
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Past Vacations"
                        />
                        {this.state.expandPastVacations ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )}
                    </ListItem>
                    <Divider />
                </List>
            </main>
        );
    }
}

export default withStyles(styles)(LeftSideBar);
