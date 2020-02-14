import React, { Component } from "react";
import { fire } from "../../Auth/firebaseConfig";
// react plugin for creating date-time-picker
//import Datetime from "react-datetime";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import moment from "moment";
import Button from "../../StyledComponents/Dashboards/Expenses/js/Button.js";
//import { Tooltip, Typography } from "@material-ui/core";

import "../../StyledComponents/Dashboards/Expenses/material-dashboard-pro-react.css";

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

class AddExpenses extends Component {
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
    disabled:  true,         //this.state.disabled,
    secondaryUsersId: this.props.secondaryUsersId,
    vacationsId: this.props.vacationsId,
    vacationsTitle: this.props.vacationsTitle,
    amount: 0,
    secondaryUsersExpense: 0,
    secondaryUsersName: "",
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
  console.log("event.target: ", event.target.name);
  this.setState({
      [event.target.name]: event.target.value
});
  if (this.state.title !== "") {
    this.setState({
      disabled: false,    
    }); 
  }
};

handleStartChange = expense => {
  if (this.props.disabled) {
    alert("Please create an expense first.")
  } else {
  let startDateTime = moment(expense).format();
  //console.log("startDateTime: ", startDateTime)
   // update the current expense record
    let expensesRec = {
      expenseName: this.props.expenseName,
      description: this.props.description,
      startDateTime: startDateTime,
      usersUid: this.state.usersUid,
      vacationsId: this.props.vacationsId,
      //secondaryUsersId: this.props.secondaryUsersId,
    } 

 axios
    .put(`${URL}/expenses/${this.props.eventsId}`, expensesRec)
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

handleEndChange = expense => {
  if (this.props.disabled) {
    alert("Please create an expense first.")
  } else {
  let endDateTime = moment(expense).format();
  // update the current vacation record
  let expenseRec = {
    eventName: this.props.eventName,
    description: this.props.description,
    endDateTime: endDateTime,   // if field empty, dont save it
    usersUid: this.state.usersUid,
  }


axios
    .put(`${URL}/expenses/${this.props.expensesId}`, expenseRec)
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
  // check expense title for validity

  
  let eventName = "";
  if (this.props.eventsId !== "") {
    eventName = this.props.eventName
  }
  let expenseRec = {
    title: this.state.title,
    eventsId: this.props.eventsId,
    vacationsId: this.props.vacationsId,
    eventName: eventName,
    vacationsTitle: this.props.title,
    secondaryUsersId: this.props.secondaryUsersId,
    amount: this.state.amount,
    secondaryUsersExpense: this.state.secondaryUsersExpense,
    secondaryUsersName: this.props.participant,
  }

axios
.post(`${URL}/expenses/`, expenseRec)
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
  //const classes = this.props;
  return (
    <div className="eventContainer">
      <div className="left">
      </div>
      <div className="right">
      <p>Expense Name: 
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.state.title}
          className="title"
        />
      </p>
      <p> 
      Event Name (select from list):
        <input
          type="text"
          name="eventName"
          onChange={this.handleChange}
          value={this.props.eventName}
          className="eventName"
        />
      </p> 
      <p>Participant (select from list):
      
        <input
          type="text"
          name="participant"
          onChange={this.handleChange}
          value={this.props.participant}
          className="participant"
        />
      </p>
      <p>Expense Amount: 
        <input
          type="text"
          name="amount"
          onChange={this.handleChange}
          value={this.state.amount}
          className="amount"
        />
      </p>
      
      <p>Amount Participant Owes: 
        <input
          type="text"
          name="secondaryUsersExpense"
          onChange={this.handleChange}
          value={this.state.secondaryUsersExpense}
          className="secondaryUsersExpense"
        />
      </p><p> </p>

            <Button
            color="rose"
            onClick={() => this.saveExpense()} 
            disabled={this.state.disabled}
            className="expButton"

            >
            Save Expense
            </Button>
            <Button
            color="rose"
            onClick={() => this.deleteExpense()} 
            className="deleteExpense"

            >
            Delete Expense
            </Button>
      </div>
    </div>
    
  );
}
}

export default AddExpenses;