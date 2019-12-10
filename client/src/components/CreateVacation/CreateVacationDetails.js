import 'date-fns';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex'
    },

})

class CreateVacationDetails extends React.Component {
    state = {
        name: this.props.name
    }

    render() {
        const { classes } = this.props;
        const { name } = this.state;

        return (
            <div className={classes.root}>
                <span>{name}</span>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        margin="normal"
                        label="Vacation Start Date"
                        name="start_date"
                        value={new Date(this.state.start_date)}
                        onChange={date => this.inputDateTimeHandler('start_date', date)}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default withStyles(styles)(CreateVacationDetails);