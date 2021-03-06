import React, { Component } from "react";
import { fire } from "../../Auth/firebaseConfig";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Tooltip, Typography } from "@material-ui/core";
// import { withStyles, Zoom } from "@material-ui/core";
import axios from "axios";
import moment from "moment";

import "../../StyledComponents/Dashboards/AddUsers/material-dashboard-pro-react.css";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";

/* const style = {
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
}; */

//const useStyles = makeStyles(style);

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

 axios
    .put(`${URL}/vacations/${this.props.vacationsId}`, vacationRec)
    .then(response => {
        console.log("start day updated")
    })
    .catch(err => {
        console.log('We"ve encountered an error');
    }); 
// clear the inputs
 this.setState({
    startDate: startDate,    
  }); 
  
  //this.props.startDate(this.state.startDate)
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


axios
    .put(`${URL}/vacations/${this.props.vacationsId}`, vacationRec)
    .then(response => {
        console.log("end date updated")
    })
    .catch(err => {
        console.log('We"ve encountered an error');
    });

 this.setState({
    endDate: endDate,    
  });  
}
};


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
    </div>
  );
}
}

export default DateTimePicker;