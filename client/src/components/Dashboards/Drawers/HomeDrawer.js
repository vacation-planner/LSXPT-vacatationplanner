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
import { AppContext } from '../../Context/AppContext'

const styles = theme => ({
    main: {
        width: '100%',
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
        // padding: '12px'
    },
    listItemTextLayerTwo: {
        fontSize: '1.5rem',
        // margin: '12px',
        // padding: '12px',
        // paddingLeft: '25px',
        color: 'black'
    },
    nested: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 40
    },
});

class HomeDrawer extends React.Component {
    state = {
        expandCurrentVacations: false,
        expandPastVacations: false,
        mobileOpen: false,
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
            expandCurrentVacations: false
        });
    };

    selectPastVacation = () => {
        this.handleClose();
        this.setState({
            expandPastVacations: false
        });
    };

    render() {
        const { classes, currentVacations, pastVacations } = this.props;
        console.log(currentVacations, this.context.state.currentVacations)
        return (
            <main className={classes.main}>
                <List className={classes.list}>
                    <ListItem
                        button
                        key="currentVacations"
                        id="expandCurrentVacations"
                        onClick={this.handleClick}
                        color="inherit"
                        style={!currentVacations.length ? { display: 'none' } : null}
                    >
                        <ListItemText classes={{ primary: classes.listItemText }} primary="Current Vacations" />

                        {this.state.expandCurrentVacations ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Divider />
                    <Collapse in={this.state.expandCurrentVacations} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {currentVacations.map((currentVacation, index) => (
                                <>
                                    {/* Add Link for each vacation */}
                                    <ListItem
                                        button
                                        key={currentVacation.id}
                                        onClick={this.selectCurrentVacation}
                                        className={classes.nested}
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
                        <ListItemText classes={{ primary: classes.listItemText }} primary="Past Vacations" />
                        {this.state.expandPastVacations ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Divider />
                    <Collapse in={this.state.expandPastVacations} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {pastVacations.map((pastVacation, index) => (
                                <>
                                    {/* Add Link for each vacation */}
                                    <ListItem
                                        button
                                        key={pastVacation.id}
                                        onClick={this.selectPastVacation}
                                        className={classes.nested}
                                    >
                                        <ListItemText
                                            id={pastVacation.id}
                                            pastVacationIndex={index}
                                            primary={pastVacation.name}
                                            classes={{ primary: classes.listItemTextLayerTwo }}
                                        />
                                    </ListItem>
                                    {/* </Link> */}
                                    <Divider />
                                </>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </main>
        );
    }
}

HomeDrawer.contextType = AppContext;

export default withStyles(styles)(HomeDrawer);
