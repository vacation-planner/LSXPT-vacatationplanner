import React, { Component } from "react";
import { fire } from "../../Auth/firebaseConfig";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import moment from "moment";
import "../../StyledComponents/Dashboards/Events/material-dashboard-pro-react.css";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";

class AddEvents extends Component {
  constructor(props) {
    super(props);
  this.state = {
    date: new Date(2019, 11, 12), 
    usersUid: "",
    value: "",
    eventsId: this.props.eventsId,
    eventName: this.props.eventName,
    description: this.props.description,
    startDateTime: "",
    endDateTime: "",
    disabled: this.props.disabled,
    vacationsId: this.props.vacationsId,
    vacationsTitle: this.props.title,
    title: "",
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
   // update the current event record
    let eventsRec = {
      eventName: this.props.eventName,
      description: this.props.description,
      startDateTime: startDateTime,
      usersUid: this.state.usersUid,
      vacationsId: this.props.vacationsId,
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
    </div>
  );
}
}

export default AddEvents;