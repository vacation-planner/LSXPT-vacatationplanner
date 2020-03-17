import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
// Components
//import AddExpenses from "./addExpenses.js"
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
// From Material Ui
import Button from "../../StyledComponents/Dashboards/Expenses/js/Button.js";
import { Tooltip, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import "../../StyledComponents/Dashboards/DashBoards.css";
import styles from "../../StyledComponents/Dashboards/Expenses/styles.js";
import NumberFormat from "react-number-format";
//import
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
    //startDateTime: "",
    //endDateTime: "",
    description: "",
    eventsId: "",
    events: [],
    disabled: false,
    deleteDisabled: true,
    participant: "",
    secondaryUsersId: 1,
    secondaryUsers: [],
    secondaryUsersExpense: 0,
    expenses: [],
    expenseOwed: 0,
    secondaryUsersFirstName: "",
    secondaryUsersLastName: "",
    checked: false,
    cost: 0,
    title: "",
    listVisible: false,
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

  saveExpense = () => {
    let eventName = "";
    if (this.state.eventsId !== "") {
      eventName = this.state.eventName
    }
    let expenseRec = {
      //title: this.state.title,
      eventsId: this.state.eventsId,
      vacationsId: this.props.vacationsId,
      eventName: eventName,
      vacationsTitle: this.props.title,
      secondaryUsersId: this.state.secondaryUsersId,
      expenseOwed: this.state.expenseOwed,
      secondaryUsersExpense: this.state.secondaryUsersExpense,
      secondaryUsersFirstName: this.state.participant,
    }
  
 /*    axios
    .post(`${URL}/expenses/`, expenseRec)
    .then(response => { */
  axios
  .post('/expenses/', expenseRec)
  .then(response => {
      console.log("file written");
      this.setState({
        deleteDisabled: false,    
      });  
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });  
}

 /*  fetchId = eventName => {
    axios
      .get('/events')
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
  }; */

  // this function grabs the list of secondary users from the table
  fetchSecondaryUsers = (vacationsId) => {
    let secondaryUsers = [];
    axios
    .get('/secondaryUsers/')
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
  };

  // this function grabs the secondaryUser record for a single user
  fetchSecondaryUser = id => {
    axios
    .get(`/secondaryUsers/${id}`)
    .then(response => {
          this.setState({
            participant: response.data.firstName,
            secondaryUsersId: id
      });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });
  };

  // this function grabs the expense record for a single expense
  fetchExpense = (eventsId, secondaryUsersId) => {
    let expenses = [];
    axios
    .get(`/expenses/events/${eventsId}`)
    .then(response => {         
      this.fetchExpenseUpdate(response.data, secondaryUsersId);
      //response.data.forEach((expense, index) => {
      //  console.log('in expenses: ', expense.eventsId);
     //   if (expense.eventsId === eventsId) {          
     //     expenses.push(expense)
   /*  .get('/events/')
    .then(response => {
      response.data.forEach((event, index) => {
        if (event.vacationsId === vacationsId) {          
            events.push(event) */
       // })
        // check the expenses array for a match to the secondary users id
      })     
    
      //console.log('expenses: ', this.state.expenses);  
    //})
    .catch(err => {
      console.log('We"ve encountered an error');
    });
    console.log('prexpenses: ', expenses);
    this.setState({
      expenses: expenses
    });    
   // this.fetchExpenseUpdate(this.state.expenses, secondaryUsersId);
   //expenses.forEach((expense, index) => {
    //  if (expense.secondaryUsersId === secondaryUsersId) {          
    //       this.setState({
            /* title: expense.title, */
    //        eventsId: expense.eventsId, 
            /* vacationsId: expense.vacationsId, */
            /* eventName: expense.eventName, */
            /* vacationsTitle: expense.vacationsTitle, */
            /* secondaryUsersId: this.state.secondaryUsersId, */
            /* amount: expense.amount, */
     //       secondaryUsersExpense: expense.secondaryUsersExpense,
     //       expenseOwed: expense.expenseOwed,
            /* secondaryUsersName: this.state.participant, */
    //        });  
    //        console.log('in expenses');
        /* expenses.push(expense) */
    //  }
      // check the expenses array for a match to the secondary users id
   // });     
  };

  fetchExpenseUpdate = (expenses, secondaryUsersId) => {
    console.log('in newFetchexpenses');
    expenses.forEach((expense, index) => {
    if (expense.secondaryUsersId === secondaryUsersId) {          
             
      this.setState({
              secondaryUsersExpense: expense.secondaryUsersExpense,
              expenseOwed: expense.expenseOwed,
              }) 
            }
    else {
      this.setState({
        secondaryUsersExpense: "",
        expenseOwed: "",
        }) 

    }
         });
    
  }

  // this function grabs the event record for a single event
  fetchEvent = (eventsId) => {
    //let events = [];
    axios
    .get(`/events/${eventsId}`)
    .then(response => {         
             this.setState({
                eventsId: eventsId,
                eventName: response.data.eventName,
                cost: response.data.cost,
                //startDateTime: response.data.startDateTime,
                //endDateTime: response.data.endDateTime,
                //description: response.data.description,
            }); 
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });
  };

   // this function grabs the list of events from the table
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
  };
  // the user has clicked on a line item in the secondaryUser box
  listSelect = (id) => {        
    this.fetchSecondaryUser(id);
    // Also need to grab all the expense data !!!
    console.log('eventsId: ', this.state.eventsId);
    console.log('secondaryUsersId: ', this.state.secondaryUsersId);
    this.fetchExpense(this.state.eventsId, id);
  };

  // the user has clicked on a line item in the events box
  eventSelect = (id) => { 
    this.setState({
      listVisible: true
    });       
    this.fetchEvent(id);
  };

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    }); 
  };
  // Create a box with a list of the current events
  eventList = (props) => {
    
    const eventItems = this.state.events.map((event) =>
      <li className="event" key={event.id} onClick={() => {this.eventSelect(event.id)}}>{event.eventName},{event.id},{event.cost}</li>
    );
    return (
      <ul className="ul">{eventItems}</ul>
    )
  };
 // Create a box with a list of the current participants
  participantList = (props) => {
    const listItems = this.state.secondaryUsers.map((user) =>
      <li className="participants" key={user.id} onClick={() => {this.listSelect(user.id)}}>{user.firstName}, {user.lastName}</li>
    );
    return (
      <ul className="ul">{listItems}</ul>
    );
  };

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
               {/*  <CardBody  xs={12} sm={12} md={12}> */}
                 {/*  <div className="eventContainer"> */}
                   {/*  <div className="left">   */}                 
                     {/*  <CardBody  className={classes.cardBodyContainer2}> */}
                        <CardBody> 
                          <h4>Available Events:</h4>{" "}                                
                          <div className="eventsList">
                              {this.eventList()} 
                          </div>          
                        </CardBody>
                        <CardBody> 
                          <h4>Vacation Participants:</h4>{" "}  
                          {this.state.listVisible ? (
                            <div className="participantsList">
                              {this.participantList()}                                        
                            </div>) : null}
                        </CardBody>
                    {/*   </CardBody > */}
                    
                    
                   {/*  </div> */}
                  
                    <Tooltip
                      placement="top"
                      disableFocusListener
                      title={
                        <Typography color="inherit" variant="h5">
                          Create an expense and optionally assign it to an event. To do this, click on the event before saving.
                        </Typography>
                      }
                    > 
                    <div className="right">
                      <p> 
                        Event Name (select from list):
                      </p> 
                        <div className="eventNameExp">
                          <p>{this.state.eventName}</p>
                        </div>
                      <p>
                        Participant (select from list): 
                      </p>            
                        <div className="participant">
                          <p> {this.state.participant}</p>
                        </div>
                      <p>
                        Total Event Cost: 
                      </p>
                      <p>
                        <NumberFormat
                          value={this.state.cost}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          className="cost"
                        />
                      </p>
                      <p>Participant Cost: 
                      {/* <NumberFormat
                        value={this.state.secondaryUsersExpense}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        className="secondaryUsersExpense"
                      /> */}  <input
                          type="text"
                          name="secondaryUsersExpense"
                          onChange={this.handleChange}
                          value={this.state.secondaryUsersExpense}
                          className="secondaryUsersExpense"
                        /> 
                      </p>
                      <p>Amount Participant Owes: 
                      {/* <NumberFormat
                        value={this.state.expenseOwed}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        className="expenseOwed"
                      /> */}
                      <input
                          type="text"
                          name="expenseOwed"
                          onChange={this.handleChange}
                          value={this.state.expenseOwed}
                          className="expenseOwed"
                        /> 
                         </p><p> </p>
                      <CardBody className={classes.btnContainer}>
                      <Button
                        color="rose"
                        onClick={() => this.saveExpense()} 
                        disabled={this.state.disabled}
                        className="expButton"
                      >
                      Save
                      </Button>
                      <Button           
                        color="rose"
                        onClick={() => this.deleteExpense()}
                        disabled={this.state.deleteDisabled} 
                        className="deleteExpense"
                      >
                      Cancel
                      </Button>
                      </CardBody>
                    </div>
                  </Tooltip>
                {/* </div> */}
              </CardBody>
           {/*  </CardBody> */}
          {/* </CardBody > */}
          
          </CardBody>   
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