import 'date-fns';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import Vacations from "../Dashboards/Vacations/index.js"
import Navbar from '../Dashboards/Navbar/HomeNavbar';
import { AppContext } from '../Context/AppContext.js';

const styles = theme => ({
    all: {
        width: '100%',
        height: '150vh',
        // backgroundColor: 'blue',
        marginTop: 100,
    },
    button: {
        width: '100%',
        backgroundColor: '#E91E63',
        margin: 0,
        color: 'white',
        height: '40px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        '&:hover': {
            color: 'white',
            backgroundColor: '#AA1649'
        }
    },
    buttonsDiv: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    cancelButton: {
        width: '100%',
        maxWidth: 150,
        margin: 0,
        color: 'black',
        height: '40px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        '&:hover': {
            color: 'white',
            backgroundColor: '#AA1649'
        }
    },
    container: {
        display: 'flex'
        // width: '100%',
        // margin: '0 auto',
        // padding: 0,
        // fontSize: '2.0rem',
    },
    createVacationButton: {
        width: '100%',
        maxWidth: 175,
        margin: 0,
        color: 'white',
        backgroundColor: '#E91E63',
        height: '40px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        '&:hover': {
            color: 'white',
            backgroundColor: '#AA1649'
        }
    },
})

class CreateVacationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            vacationName: ''
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, vacationName: '' });
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    };

    render() {
        const { classes } = this.props;
        console.log(this.context.state)
        return (
            <div className={classes.container}>
                <Navbar />
                <div className={classes.all}>
                    {/* {this.context.state.tempVacationName}, {this.props.state}, test */}
                    <Vacations>
                        </Vacations>
                </div>

            </div>
        )
    }
}
/* <span>{name}</span>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        margin="normal"
                        label="Vacation Start Date"
                        name="start_date"
                        value={new Date(this.state.start_date)}
                        onChange={date => this.inputDateTimeHandler('start_date', date)}
                    />
                </MuiPickersUtilsProvider> */

CreateVacationDetails.contextType = AppContext;

export default withStyles(styles)(CreateVacationDetails);