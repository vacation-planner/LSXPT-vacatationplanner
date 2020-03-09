import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
// Components
import AddExpenses from "./addExpenses.js"
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
// From Material Ui
import withStyles from "@material-ui/core/styles/withStyles";
import "../../StyledComponents/Dashboards/DashBoards.css";
import styles from "../../StyledComponents/Dashboards/Expenses/styles.js";
import { Zoom } from "@material-ui/core";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";


class Expenses extends Component {
  constructor(props) {
    super(props);
  this.state = {
    usersUid: "",
    value: "",
    eventName: "",
    vacationsTitle: this.props.title,
    vacationsId: this.props.vacationsId,
    startDateTime: "",
    endDateTime: "",
    description: "",
    eventsId: "",
    events: [],
    disabled: false,
    participant: "",
    secondaryUsersId: 1,
    secondaryUsers: [],
    secondaryUsersExpense: 0,
    secondaryUsersName: "",
    checked: false,
    amount: 0,
    title: "",
   };
};

componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));  
    let usersUid = fire.currentUser.uid;
   // grab the list of secondary users
    this.fetchSecondaryUsers(this.state.vacationsId);
    // grab the list of current events
    this.fetchEvents(this.state.vacationsId);

       this.setState({
        usersUid: usersUid
      }); 
    };

addExpense = () => {
    // create a record using the input
    let eventsRec = {
        eventName: this.state.eventName,
        description: this.state.description,
        usersUid: this.state.usersUid,
    }

    axios
        .post(`${URL}/events/`, eventsRec)
        .then(response => {
            console.log("file written");
            // get the id of the new record
            this.fetchId(this.state.eventName);
        })
        .catch(err => {
            console.log('We"ve encountered an error');
        });  
  }

  saveExpense = () => {
    let eventName = "";
    if (this.state.eventsId !== "") {
      eventName = this.state.eventName
    }
    let expenseRec = {
      title: this.state.title,
      eventsId: this.props.eventsId,
      vacationsId: this.props.vacationsId,
      eventName: eventName,
      vacationsTitle: this.props.title,
      secondaryUsersId: this.state.secondaryUsersId,
      amount: this.state.amount,
      secondaryUsersExpense: this.state.secondaryUsersExpense,
      secondaryUsersName: this.state.participant,
    }
  
  axios
  .post(`${URL}/expenses/`, expenseRec)
  .then(response => {
      console.log("file written");
  })
  .catch(err => {
      console.log('We"ve encountered an error');
  });  
  
  }

  fetchId = eventName => {
    axios
      .get(`${URL}/events`)
      .then(response => {
        response.data.forEach((item, index) => {
          if (item.eventName === this.state.eventName) {          
            this.setState({
                eventsId: item.id,
                disabled: false
            });
          }
        });
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  // this subroutine grabs the list of secondary users from the table
  fetchSecondaryUsers = (vacationsId) => {
    let secondaryUsers = [];
    axios
    .get(`${URL}/secondaryUsers/`)
    .then(response => {
      response.data.forEach((user, index) => {
        if (user.vacationsId === vacationsId) {          
          secondaryUsers.push(user)
        } 
        });
          this.setState({
            secondaryUsers: secondaryUsers
        });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });
  }

  // this function grabs the secondaryUser record for a single user
  fetchSecondaryUser = id => {
    axios
    .get(`${URL}/secondaryUsers/${id}`)
    .then(response => {
          this.setState({
            participant: response.data.firstName,
            secondaryUsersId: id
      });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });
  }

  // this subroutine grabs the list of events from the table
  fetchEvents = (vacationsId) => {
    let events = [];
    axios
    .get(`${URL}/events/`)
    .then(response => {
      response.data.forEach((event, index) => {
        if (event.vacationsId === vacationsId) {          
            events.push(event)
        }
          this.setState({
            events: events
          });
      });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });
  }

  // this function grabs the event record for a single event
  fetchEvent = (eventsId) => {
    //let events = [];
    axios
    .get(`${URL}/events/${eventsId}`)
    .then(response => {         
             this.setState({
                eventsId: eventsId,
                eventName: response.data.eventName,
                startDateTime: response.data.startDateTime,
                endDateTime: response.data.endDateTime,
                description: response.data.description,
            }); 
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });

  }

  // the user has clicked on a line item in the box
  listSelect = (id) => {        
    this.fetchSecondaryUser(id);
  }

  // the user has clicked on a line item in the box
  eventSelect = (id) => {        
    this.fetchEvent(id);
  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    }); 
  };
  // Create a box with a list of the current events
  eventList = (props) => {
    const eventItems = this.state.events.map((event) =>
      <li className="event" key={event.id} onClick={() => {this.eventSelect(event.id)}}>{event.eventName}</li>
    );
    return (
      <ul className="ul">{eventItems}</ul>
    );
  }
 // Create a box with a list of the current participants
  participantList = (props) => {
    const listItems = this.state.secondaryUsers.map((user) =>
      <li className="participants" key={user.id} onClick={() => {this.listSelect(user.id)}}>{user.firstName}, {user.lastName}</li>
    );
    return (
      <ul className="ul">{listItems}</ul>
    );
  }

render() {
  const { classes } = this.props;
  const { checked } = this.state;

    return (
         <div className={classes.parent}>
            <Zoom in={checked} > 
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <h3>Create Expense: {this.state.eventName}</h3>
                      <h4>Current Vacation: {this.props.title}</h4>
                      <CardBody   className={classes.cardBody2}>
                        <CardBody  className={classes.cardBodyContainer1}>
                          <CardBody  xs={12} sm={12} md={12}>
                              <AddExpenses 
                                eventsId={this.state.eventsId}
                                eventName={this.state.eventName} 
                                description={this.state.description} 
                                participant={this.state.participant}
                                secondaryUsersId={this.state.secondaryUsersId}
                                vacationsId={this.state.vacationsId}
                                amount={this.state.amount}
                                secondaryUsersExpense={this.state.secondaryUsersExpense}
                                secondaryUsersName={this.state.participant}
                                startTimeDate={() => this.handleStartDate(this.state.startTimeDate)}>
                              </AddExpenses>  
                            </CardBody>
                          </CardBody>
                          <CardBody  className={classes.cardBodyContainer2}>
                            <CardBody> 
                              <h4>Available Events:</h4>{" "}                                
                              <div className="eventsList">
                                {this.eventList()} 
                              </div>          
                            </CardBody>
                            <CardBody> 
                              <h4>Vacation Participants:</h4>{" "}  
                              <div className="participantsList">
                                {this.participantList()}                                        
                              </div>
                            </CardBody>
                          </CardBody >
                        </CardBody >
                        <CardBody  
                          className={classes.cardBodyContainer3}>
                        </CardBody>                        
                    </GridItem>
                </GridContainer>
            </Zoom>
        </div> 
    );
  }
}

export default withStyles(styles)(Expenses);