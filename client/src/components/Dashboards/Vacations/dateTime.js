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

import "../../StyledComponents/Dashboards/AddUsers/material-dashboard-pro-react.css";

const URL = 'https://vacationplannerlx.herokuapp.com/api';
//const URL = "http://localhost:5500/api";

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

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
  this.state = {
    events: this.props.events,
    date: new Date(2019, 11, 12), 
    uid: "",
    value: "",
   };
}

componentDidMount() {
   let uid = fire.currentUser.uid;
   this.setState({
    uid: uid
  }); 
};

handleStartChange = event => {
  let newDate = moment(event).format();
   // save new value to db
  //this.setState({value: event});
};

handleEndChange = event => {
  let newDate = moment(event).format();
   // save new value to db
  //this.setState({value: event}); 
};


 render() {
  const classes = this.props;
  return (
    <div>
      <InputLabel className={classes.label}>
        Vacation Start Date
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime timeFormat={false}
        value={this.props.value}
         onChange={event => this.handleStartChange(event)} 
          inputProps={{ 
            placeholder: "Start Vacation" }}
        />
      </FormControl>
      <InputLabel className={classes.label}>
      Vacation End Date
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          timeFormat={false}
          value={this.props.value}
         onChange={event => this.handleEndChange(event)} 
          inputProps={{ placeholder: "End Vacation" }}
        />
      </FormControl>
     {/*  <InputLabel className={classes.label}>
        Time Picker
      </InputLabel> */}
      <br />
     {/*  <FormControl fullWidth>
        <Datetime
          dateFormat={false}
          inputProps={{ placeholder: "Time Picker Here" }}
        />
      </FormControl> */}
    </div>
  );
}
}

export default DateTimePicker;