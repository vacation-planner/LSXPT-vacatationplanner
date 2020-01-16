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
        borderRight: '1px solid #BBC1C5',
        padding: '0px',
        margin: '0px',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: 'black',
        },
    },
    list: {
        padding: '0px',
        margin: '0px',
        fontSize: '1.75rem'
    },
    listItemText: {
        fontSize: '1.75rem',
    },
    listItemTextLayerTwo: {
        fontSize: '1.5rem',
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

        return (
            <main className={classes.main}>
                <List className={classes.list}>
                    <ListItem
                        button
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
                        <List component="div" disablePadding >
                            {currentVacations.map((currentVacation, index) => (
                                <React.Fragment key={`current${currentVacation.id}`}>
                                    <Link
                                        className={classes.link}
                                        to={{
                                            pathname: '/dashboards/current',
                                            state: {
                                                index: index,
                                                currentVacationId: currentVacation.id,
                                                currentVacationTitle: currentVacation.title,
                                            }
                                        }}
                                        >
                                        <ListItem
                                            button
                                            onClick={this.selectCurrentVacation}
                                            className={classes.nested}
                                        >
                                            <ListItemText
                                                id={currentVacation.id}
                                                index={index}
                                                primary={currentVacation.title}
                                                classes={{ primary: classes.listItemTextLayerTwo }}
                                            />
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Collapse>
                    <ListItem
                        button
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
                                <React.Fragment key={`past${pastVacation.id}`}>
                                    <Link
                                        className={classes.link}
                                        to={{
                                            pathname: '/dashboards/past',
                                            state: {
                                                index: index,
                                                pastVacationId: pastVacation.id,
                                                pastVacationTitle: pastVacation.title,
                                            }
                                        }}
                                    >
                                        <ListItem
                                            button
                                            onClick={this.selectPastVacation}
                                            className={classes.nested}
                                        >
                                            <ListItemText
                                                id={pastVacation.id}
                                                index={index}
                                                primary={pastVacation.title}
                                                classes={{ primary: classes.listItemTextLayerTwo }}
                                            />
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                </React.Fragment>
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
