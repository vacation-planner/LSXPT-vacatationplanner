import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { AppContext } from '../Context/AppContext.js';

const styles = theme => ({
    buttonWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    cancelButton: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        width: '40%',
        minWidth: 200,
        height: 45,
        border: '1px solid darkgrey',
        borderRadius: '5px',
        [theme.breakpoints.down(500)]: {
            width: '100%'
        },
    },
    container: {
        position: 'fixed',
        zIndex: 19999,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(43, 43, 43, 0.3)'
    },
    closeVacationButton: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        width: '40%',
        minWidth: 200,
        height: 45,
        border: '1px solid darkgrey',
        borderRadius: '5px',
        backgroundColor: '#E91E63',
        color: 'white',
        textDecoration: 'none',
        [theme.breakpoints.down(500)]: {
            width: '100%',
            marginBottom: 20,
        },
    },
    deleteButtonLink: {
        width: '40%',
        minWidth: 200,
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        [theme.breakpoints.down(500)]: {
            width: '100%',
        },
    },
    message: {
        fontSize: '1.5rem',
        marginBottom: 15,
    },
    modalContainer: {
        width: '40%',
        minWidth: 600,
        border: '1px solid #888888',
        backgroundColor: '#FEFEFE',
        margin: '30vh auto',
        padding: 20,
        zIndex: 200000,
        [theme.breakpoints.down(1000)]: {
            width: '85%',
            maxWidth: 600,
            minWidth: 0,
        },
        [theme.breakpoints.down(710)]: {
            width: '100%',
        },
    },
});

class CloseVacationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.modalContainer}>
                    <p className={classes.message}>Are you sure you want to close this vacation?  Closing the vacation will not allow you to add or edit anything else in the vacation.</p>
                    <div className={classes.buttonWrapper}>
                        <Button variant='contained' onClick={this.props.closeVacation} className={classes.closeVacationButton}>Close Vacation</Button>
                        <Button variant='contained' onClick={this.props.close} className={classes.cancelButton}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}

CloseVacationModal.contextType = AppContext;

export default withStyles(styles)(CloseVacationModal);