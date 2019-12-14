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
    startTimeDate: "",
    endTimeDate: "",
    disabled: this.props.disabled,
    secondaryUsersId: this.props.secondaryUsersId,
    vacationsId: this.props.vacationsId,
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
    alert("Please create a event first.")
  } else {
  let startTimeDate = moment(event).format();
  console.log("startTimeDate: ", startTimeDate)
   // update the current event record
    let eventsRec = {
    eventName: this.props.eventName,
    description: this.props.description,
    startTimeDate: startTimeDate,
    usersUid: this.state.usersUid,
    vacationsId: this.props.vacationsId,
    secondaryUsersId: this.props.secondaryUsersId,
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
    startTimeDate: startTimeDate,    
  }); 
  
  //this.props.startTimeDate(this.state.startTimeDate)
  }
};

handleEndChange = event => {
  if (this.props.disabled) {
    alert("Please create a event first.")
  } else {
  let endTimeDate = moment(event).format();
  // update the current vacation record
  let eventRec = {
    eventName: this.props.eventName,
    description: this.props.description,
    endTimeDate: endTimeDate,   // if field empty, dont save it
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
    endTimeDate: endTimeDate,    
  });  
}
};


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
        <input
          type="text"
          name="eventCost"
          onChange={this.handleChange}
          value={this.state.eventName}
          className="eventCost"
        />
      </p>
      <p>Participant:
        <input
          type="text"
          name="participant"
          onChange={this.handleChange}
          value={this.state.eventName}
          className="participant"
        />
      </p>
      <p>Amount Participant Owes: 
        <input
          type="text"
          name="amountOwed"
          onChange={this.handleChange}
          value={this.state.eventName}
          className="amountOwed"
        />
      </p>

      </div>
    </div>
    
  );
}
}

export default AddEvents;