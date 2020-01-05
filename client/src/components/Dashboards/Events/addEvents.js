import React, { Component } from "react";
import { fire } from "../../Auth/firebaseConfig";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import moment from "moment";
import { Zoom, Tooltip, Typography } from "@material-ui/core";

import "../../StyledComponents/Dashboards/Events/material-dashboard-pro-react.css";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";

const style = {
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  }
};

const useStyles = makeStyles(style);

class AddEvents extends Component {
  constructor(props) {
    super(props);
  this.state = {
    events: this.props.events,
    date: new Date(2019, 11, 12), 
    usersUid: "",
    value: "",
    eventsId: this.props.eventsId,
    eventName: this.props.eventName,
    description: this.props.description,
    startDateTime: "",
    endDateTime: "",
    participant: this.props.participant,
    disabled: this.props.disabled,
    secondaryUsersId: this.props.secondaryUsersId,
    vacationsId: this.props.vacationsId,
    expense: "",
    secondaryUsersExpense: "",

   };
}

componentDidMount() {
   let usersUid = fire.currentUser.uid;
   this.setState({
    usersUid: usersUid
  }); 
};

handleChange = event => {

  this.setState({
      [event.target.name]: event.target.value
});
  
};

handleStartChange = event => {
  if (this.props.disabled) {
    alert("Please create an event first.")
  } else {
  let startDateTime = moment(event).format();
  //console.log("startDateTime: ", startDateTime)
   // update the current event record
    let eventsRec = {
      eventName: this.props.eventName,
      description: this.props.description,
      startDateTime: startDateTime,
      usersUid: this.state.usersUid,
      vacationsId: this.props.vacationsId,
      //secondaryUsersId: this.props.secondaryUsersId,
    } 

 axios
    .put(`${URL}/events/${this.props.eventsId}`, eventsRec)
    .then(response => {
        console.log("start day updated")
    })
    .catch(err => {
        console.log('We"ve encountered an error');
    }); 
// clear the inputs
 this.setState({
    startDateTime: startDateTime,    
  }); 
  
  }
};

handleEndChange = event => {
  if (this.props.disabled) {
    alert("Please create a event first.")
  } else {
  let endDateTime = moment(event).format();
  // update the current vacation record
  let eventRec = {
    eventName: this.props.eventName,
    description: this.props.description,
    endDateTime: endDateTime,   // if field empty, dont save it
    usersUid: this.state.usersUid,
  }


axios
    .put(`${URL}/events/${this.props.eventsId}`, eventRec)
    .then(response => {
        console.log("end date updated")
    })
    .catch(err => {
        console.log('We"ve encountered an error');
    });

 this.setState({
    endDateTime: endDateTime,    
  });  
}
};

saveExpense = () => {
let expenseRec = {
  eventsId: this.props.eventsId,
  vacationsId: this.props.vacationsId,
  secondaryUsersId: this.props.secondaryUsersId,
  expense: this.state.expense,
  secondaryUsersExpense: this.state.secondaryUsersExpense
}

axios
.post(`${URL}/eventUsers/`, expenseRec)
.then(response => {
    console.log("file written");
    // get the id of the new record
    //this.fetchId(this.state.eventName);
})
.catch(err => {
    console.log('We"ve encountered an error');
});  

}

 render() {
  const classes = this.props;
  return (
    <div className="eventContainer">
      <div className="left">
        <InputLabel className={classes.label}>
          Event Start Date
        </InputLabel>
        <br />
        <FormControl fullWidth>
          <Datetime /* timeFormat={false} */
            value={this.props.value}
            onChange={event => this.handleStartChange(event)} 
            inputProps={{ 
              placeholder: "Start Event"
            }}
          />
        </FormControl>
        <InputLabel className={classes.label}>
          Event End Date
        </InputLabel>
        <br />
        <FormControl fullWidth>
          <Datetime
            /*  timeFormat={false} */
            value={this.props.value}
            onChange={event => this.handleEndChange(event)} 
            inputProps={{ placeholder: "End Event" }}
          />
        </FormControl>
      </div>
      <div className="right">
      <p>Event Cost: 
      <Tooltip
          placement="top"
          disableFocusListener
          title={
            <Typography color="inherit" variant="h6">
              Enter the total cost of the selected event
            </Typography>
          }
        >
        <input
          type="text"
          name="expense"
          onChange={this.handleChange}
          value={this.state.expense}
          className="expense"
        />
        </Tooltip>
      </p>
      <p>Participant:
      <Tooltip
          placement="top"
          disableFocusListener
          title={
            <Typography color="inherit" variant="h6">
              Select a participant from the list
            </Typography>
          }
        >
        <input
          type="text"
          name="participant"
          onChange={this.handleChange}
          value={this.props.participant}
          className="participant"
        />
        </Tooltip>
      </p>
      <p>Amount Participant Owes: 
      <Tooltip
          placement="top"
          disableFocusListener
          title={
            <Typography color="inherit" variant="h6">
              Enter the share of the cost for this participant
            </Typography>
          }
        >
        <input
          type="text"
          name="secondaryUsersExpense"
          onChange={this.handleChange}
          value={this.state.secondaryUsersExpense}
          className="secondaryUsersExpense"
        />
        </Tooltip>
      </p>
      <Tooltip
          placement="top"
          disableFocusListener
          title={
            <Typography color="inherit" variant="h6">
              Save the expense info
            </Typography>
          }
        >
            <button
            onClick={this.saveExpense}
            className="expButton"

            >
            Save Expense
            </button>
            </Tooltip>
      </div>
    </div>
    
  );
}
}

export default AddEvents;