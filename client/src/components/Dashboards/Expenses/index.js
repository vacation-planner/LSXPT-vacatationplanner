import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
import Button from "../../StyledComponents/Dashboards/Expenses/js/Button.js";
import { Tooltip, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import "../../StyledComponents/Dashboards/DashBoards.css";
import styles from "../../StyledComponents/Dashboards/Expenses/styles.js";
import NumberFormat from "react-number-format";
import { Zoom } from "@material-ui/core";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";


class Expenses extends Component {
  constructor(props) {
    super(props);
  this.state = {
    //usersUid: "",
    value: "",
    eventName: "",
    vacationsTitle: this.props.title,
    vacationsId: this.props.vacationsId,
    //description: "",
    eventsId: "",
    events: [],
    disabled: true,
    deleteDisabled: true,
    participant: "",
    secondaryUsersId: 1,
    secondaryUsers: [],
    secondaryUsersExpense: "",
    expenses: [],
    expenseOwed: "",
    secondaryUsersFirstName: "",
    secondaryUsersLastName: "",
    checked: false,
    cost: 0,
    //title: "",
    listVisible: false,
    editFlag: false,
    expenseId: "",
   };
};

  componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));  
    let usersUid = fire.currentUser.uid;
   // grab the list of secondary users
    this.fetchSecondaryUsers(this.state.vacationsId);
    // grab the list of current events
    this.fetchEvents(this.state.vacationsId);
     /*  this.setState({
        usersUid: usersUid
      }); */ 
    };

    // function saves the new expense to the database
  saveExpense = () => {
    // checking for empty fields 
    if (this.state.secondaryUsersExpense !== "") {
      if (this.state.expenseOwed !== "") {
        // check if this is a PUT or a POST
        
        let expenseRec = {
          eventsId: this.state.eventsId,
          vacationsId: this.props.vacationsId,
          eventName: this.state.eventName,
          vacationsTitle: this.props.title,
          secondaryUsersId: this.state.secondaryUsersId,
          expenseOwed: this.state.expenseOwed,
          secondaryUsersExpense: this.state.secondaryUsersExpense,
          secondaryUsersFirstName: this.state.secondaryUsersFirstName,
          secondaryUsersLastName: this.state.secondaryUsersLastName,
        }
        if (this.state.editFlag === false) {
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
     
   else {
    // PUT goes here
      //.put(`${URL}/users/${this.state.uid}`, newRec)
      axios
      .put(`/expenses/${this.state.expenseId}`, expenseRec)
      .then(response => {
          console.log("file updated");
          this.setState({
            editFlag: false,    
          });  
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        }); 
      }; 
    } else {
      alert("Expense fields cannot be empty")
    }
  }
}
  

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
        secondaryUsersFirstName: response.data.firstName,
        secondaryUsersLastName: response.data.lastName,
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
    })     
    .catch(err => {
      console.log('We"ve encountered an error');
    });
    this.setState({
      expenses: expenses
    });    
   
  };

  // this function grabs the secondary user data and clears the 
  // field values when necessary
  fetchExpenseUpdate = (expenses, secondaryUsersId) => {
    let match = false;
    expenses.forEach((expense, index) => {
      if (expense.secondaryUsersId === secondaryUsersId) {          
        match = true;       
        this.setState({
          secondaryUsersExpense: expense.secondaryUsersExpense,
          expenseOwed: expense.expenseOwed,
          expenseId: expense.id,
          editFlag: true,
        }) 
      } else {
        if (match === false) {
          this.setState({
            secondaryUsersExpense: "",
            expenseOwed: "",
            editFlag: false,
          }) 
        }
      }
    });
  }

  // this function grabs the event record for a single event
  fetchEvent = (eventsId) => {
    axios
      .get(`/events/${eventsId}`)
      .then(response => {         
        this.setState({
          eventsId: eventsId,
          eventName: response.data.eventName,
          cost: response.data.cost,
          secondaryUsersExpense: "",
          expenseOwed: "",
          secondaryUsersFirstName: "",
          secondaryUsersLastName: "",
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
    //console.log('eventsId: ', this.state.eventsId);
    //console.log('secondaryUsersId: ', this.state.secondaryUsersId);
    this.fetchExpense(this.state.eventsId, id);
  };

  // the user has clicked on a line item in the events box
  eventSelect = (id) => { 
    this.setState({
      listVisible: true,
      disabled: false,
    });       
    this.fetchEvent(id);
  };

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    }); 
  };

  editRec = () => {
    if (this.state.secondaryUsersExpense !== "") {
      // set the flag for edit
      console.log('in the editRec');
      this.setState({
        editFlag: true
      });
    }

  }

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
          <CardBody className={classes.titleBox}>
            <h3>Create Expense: {this.state.eventName}</h3>
            <h4>Current Vacation: {this.props.title}</h4>
            </CardBody>
            <CardBody   className={classes.cardBody2}>
              <CardBody  className={classes.cardBodyContainer1}>
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
                </CardBody> 
                <CardBody   className={classes.cardBodyContainer2}>           
              <Tooltip
                placement="top"
                disableFocusListener
                title={
                  <Typography color="inherit" variant="h5">
                    Select an event and participant then add the expenses, Save before exiting.
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
                    <p> {this.state.secondaryUsersFirstName} {this.state.secondaryUsersLastName}</p>
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
                    <NumberFormat 
                      value={this.state.secondaryUsersExpense} 
                      thousandSeparator={true} 
                      className="secondaryUsersExpense"
                      prefix={'$'} 
                      onValueChange={(values) => {
                        const {formattedValue, value} = values;
                          // formattedValue = $2,223
                          // value ie, 2223
                        this.setState({secondaryUsersExpense: formattedValue})
                      }}/>
                  </p>
                  <p>Amount Participant Owes: 
                    <NumberFormat 
                      value={this.state.expenseOwed} 
                      thousandSeparator={true} 
                      className="expenseOwed"
                      prefix={'$'} 
                      onValueChange={(values) => {
                        //this.editRec();
                        const {formattedValue, value} = values;
                          // formattedValue = $2,223
                          // value ie, 2223
                        this.setState({expenseOwed: formattedValue})
                      }}/>
                  </p>
                  <p> </p>
                </div>
              </Tooltip>
            </CardBody> 
          </CardBody>   
          {/* <CardBody className={classes.cardBodyContainer3}> */}
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
          {/* </CardBody>    */}                  
        </GridItem>
      </GridContainer>
    </Zoom>
  </div> 
    );
  }
}

export default withStyles(styles)(Expenses);