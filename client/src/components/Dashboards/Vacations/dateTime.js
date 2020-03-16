import React, { Component } from "react";
import { fire } from "../../Auth/firebaseConfig";

// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Tooltip, Typography } from "@material-ui/core";
import moment from "moment";
import { AppContext } from '../../Context/AppContext.js';

import "../../StyledComponents/Dashboards/AddUsers/material-dashboard-pro-react.css";
import EndDateErrorModal from './endDateErrorModal.js';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      date: new Date(2019, 11, 12),
      usersUid: "",
      value: "",
      vacationsId: this.props.vacationsId,
      title: "",
      location: "",
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      disabled: this.props.disabled,
      endDateError: false,
    };
  }

  componentDidMount() {

    let usersUid = fire.currentUser.uid;
    this.setState({
      usersUid: usersUid
    });
  };

  handleStartChange = event => {
    if (this.props.disabled) {
      alert("Please create a vacation first.")
    } else {
      let startDate = moment(event).format();
      // update the current vacation record
      let vacationRec = {
        title: this.props.title,
        location: this.props.location,
        startDate: startDate,
        usersUid: this.state.usersUid,
      }
      this.context.updateVacationStartDate(this.props.vacationsId, vacationRec, vacationRec.startDate);
      this.setState({
        startDate: startDate,
      });
    }
  };

  handleEndChange = event => {
    if (this.props.disabled) {
      alert("Please create a vacation first.")
    } else {
      let endDate = moment(event).format();
      // update the current vacation record
      let vacationRec = {
        title: this.props.title,
        location: this.props.location,
        endDate: endDate,   // if field empty, dont save it
        usersUid: this.state.usersUid,
      }
      this.context.updateVacationEndDate(this.props.vacationsId, vacationRec, vacationRec.endDate);
      this.setState({
        endDate: endDate,
      });
      const foundIndexAllVacations = this.context.state.allVacations.findIndex(x => x.id === this.props.vacationsId);
      if (this.context.state.allVacations[foundIndexAllVacations].startDate !== "") {
        if (Date.parse(this.context.state.allVacations[foundIndexAllVacations].startDate) > Date.parse(endDate)) {
          this.setState({
            endDateError: true
          })
        }
      }
    }
  };

  flipEndDateError = event => {
    event.preventDefault();
    this.setState({
      endDateError: false
    })
  }

  render() {
    const classes = this.props;

    return (
      <div>
        <InputLabel className={classes.label}>
          Vacation Start Date
      </InputLabel>
        <br />
        <Tooltip
          placement="top"
          disableFocusListener
          title={
            <Typography color="inherit" variant="h6" gutterBottom>
              Select date the vacation begins
            </Typography>
          }
        >
          <FormControl fullWidth>
            <Datetime timeFormat={false}
              value={this.props.value}
              onChange={event => this.handleStartChange(event)}
              inputProps={{
                placeholder: this.props.startDate
              }}
            />
          </FormControl>
        </Tooltip>
        <InputLabel className={classes.label}>
          Vacation End Date
      </InputLabel>
        <br />
        <Tooltip
          placement="top"
          disableFocusListener
          title={
            <Typography color="inherit" variant="h6" gutterBottom>
              Select date the vacation ends
          </Typography>
          }
        >
          <FormControl fullWidth>
            <Datetime
              timeFormat={false}
              value={this.props.value}
              onChange={event => this.handleEndChange(event)}
              inputProps={{ placeholder: this.props.endDate }}
            />
          </FormControl>
        </Tooltip>
        <br />
        {this.state.endDateError ? <EndDateErrorModal close={this.flipEndDateError} /> : null}
      </div>
    );
  }
}

DateTimePicker.contextType = AppContext;

export default DateTimePicker;