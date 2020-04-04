import React, { Component } from "react";
import { AppContext } from '../../Context/AppContext.js';
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
import Button from "../../StyledComponents/Dashboards/Expenses/js/Button.js";
import swal from '@sweetalert/with-react';
import { Tooltip, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import "../../StyledComponents/Dashboards/DashBoards.css";
import styles from "../../StyledComponents/Dashboards/Expenses/styles.js";
import Popover from '@material-ui/core/Popover';
//import Typography from '@material-ui/core/Typography';
import NumberFormat from "react-number-format";
import { Zoom } from "@material-ui/core";

//const [anchorEl, setAnchorEl] = React.useState(null);

class Expenses extends Component {
  constructor(props) {
    super(props);
  this.state = {
    value: "",
    eventName: "",
    vacationsTitle: this.props.title,
    vacationsId: this.props.vacationsId,
    eventsId: "",
    events: [],
    participant: "",
    secondaryUsersId: 1,
    secondaryUsers: [],
    secondaryUsersExpense: "",
    expenses: [],
    expenseOwed: "",
    secondaryUsersFirstName: "",
    secondaryUsersLastName: "",
    secondaryUserPayeeFirstName: "",
    secondaryUserPayeeLastName: "",
    secondaryUsersPayeeId: "",
    checked: false,
    disabled: true,
    deleteDisabled: true,
    cost: 0,
    listVisible: false,
    editFlag: false,
    expenseId: "",
   };
};

  componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));  
    // grab the list of current events
    this.fetchEvents(this.state.vacationsId);
    // grab the list of secondary users
    this.fetchSecondaryUsers(this.state.vacationsId);
  };

  // function saves the new expense to the database
  // it checks a flag to determine if it needs to do a PUT or POST.
  saveExpense = () => {
    // checking for empty fields 
    if (this.state.secondaryUsersExpense !== "") {
      if (this.state.expenseOwed !== "") {
        let expenseRec = {
          eventsId: this.state.eventsId,
          vacationsId: this.state.vacationsId,
          eventName: this.state.eventName,
          vacationsTitle: this.props.title,
          secondaryUsersId: this.state.secondaryUsersId,
          expenseOwed: this.state.expenseOwed,
          secondaryUsersExpense: this.state.secondaryUsersExpense,
          secondaryUsersFirstName: this.state.secondaryUsersFirstName,
          secondaryUsersLastName: this.state.secondaryUsersLastName,
          secondaryUserPayeeFirstName: this.state.secondaryUserPayeeFirstName,
          secondaryUserPayeeLastName: this.state.secondaryUserPayeeLastName,
          secondaryUsersPayeeId: this.state.secondaryUsersPayeeId,
        }
      // check if this is a PUT or a POST
      if (this.state.editFlag === false) {
        axios
        .post('/expenses/', expenseRec)
        .then(response => {
            console.log("new record created");
            this.setState({
              deleteDisabled: false,    
            });  
          })
          .catch(err => {
            console.log('We"ve encountered an error');
          }); 
        }   
      else {
        // its a PUT operation
        axios
        .put(`/expenses/${this.state.expenseId}`, expenseRec)
        .then(response => {
            console.log("record updated");
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
    if (this.state.vacationsId !== undefined) {
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
    } else if (this.context.state.tempVacationHolder.title === this.props.title) {
      axios
      .get('/secondaryUsers/')
      .then(response => {
        response.data.forEach((user, index) => {
          if (user.vacationsId === this.context.state.tempVacationHolder.id) {
            secondaryUsers.push(user)
          }   
        });
        this.setState({
          secondaryUsers: secondaryUsers,
          vacationsId: this.context.state.tempVacationHolder.id,
        });
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
    }
  };

  // this function grabs the secondaryUser record for a single user
  // and saves several fields to state
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
  // this is a two step process since we dont have the expense id.
  fetchExpense = (eventsId, secondaryUsersId) => {
    let expenses = [];
    // need the expense data for all the expenses for a given event
    axios
    .get(`/expenses/events/${eventsId}`)
    .then(response => {         
      // call the expense update function using the filtered data
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
  // field values when necessary, it also sets the edit flag
  // to determine if we need a PUT or POST when the SAVE button is selected
  fetchExpenseUpdate = (expenses, secondaryUsersId) => {
    // if the expense fields have a value, then set matchFlag to true
    // othwise the values in the expense fields will be cleared
    let matchFlag = false;
    expenses.forEach((expense, index) => {
      if (expense.secondaryUsersId === secondaryUsersId) {          
        matchFlag = true;       
        this.setState({
          secondaryUsersExpense: expense.secondaryUsersExpense,
          expenseOwed: expense.expenseOwed,
          expenseId: expense.id,
          editFlag: true,
        }) 
      } else {
        if (matchFlag === false) {
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
  // and clears the expense fields
  fetchEvent = (eventsId) => {
    axios
      .get(`/events/${eventsId}`)
      .then(response => {         
        this.setState({
          eventsId: eventsId,
          eventName: response.data.eventName,
          cost: response.data.cost,
          secondaryUsersExpense: "",
          secondaryUsersPayeeId: response.data.secondaryUsersId,
          expenseOwed: "",
          secondaryUsersFirstName: "",
          secondaryUsersLastName: "",
          //secondaryUsersPayeeFirstName: "",
         // secondaryUsersPayeeLastName: "",
        }); 
        let id =  response.data.secondaryUsersId;
        //console.log("id: ", id)
        this.fetchSecondaryUsersPayeeName(id)
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  // need to get the name of the payment recipient
  fetchSecondaryUsersPayeeName = (id) => {
    //console.log("id_payee: ", id)
    // use the id and query the secondaryUsers table to get the full name
  axios
    .get(`/secondaryUsers/${id}`)
    .then(response => {
      this.setState({
        secondaryUserPayeeFirstName: response.data.firstName,
        secondaryUserPayeeLastName: response.data.lastName,
      });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });

  }

   // this function grabs the list of events from the table
  fetchEvents = (vacationsId) => {
    let events = [];
    if (this.props.vacationsId !== undefined) {
      axios
        .get('/events/')
        .then(response => {
          response.data.forEach((event, index) => {
            if (event.vacationsId === vacationsId) {
              events.push(event)
            }
          });
          this.setState({
            events: events
          });
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
    else if (this.context.state.tempVacationHolder.title === this.props.title) {
      axios
        .get('/events/')
        .then(response => {
          response.data.forEach((event, index) => {
            if (event.vacationsId === this.context.state.tempVacationHolder.id) {
              events.push(event)
            }
          });
          this.setState({
            events: events,
            vacationsId: this.context.state.tempVacationHolder.id,
          });
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
  }

  // the user has clicked on a line item in the secondaryUser box
  listSelect = (id) => {        
    this.fetchSecondaryUser(id);
    // grabs the expense record
    this.fetchExpense(this.state.eventsId, id);
  };

  // the user has clicked on a line item in the events box
  // it also makes the listbox visible
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

  displaySwal = event => {
    
     swal(
       <div className="helpBox">
        {/*  <form onSubmit={this.submitForm} > */}
           <h4>Help - Assign an Expense to an Event</h4>
           <p>Step 1: Select an event.</p>
           <p>Step 2: Select a participant, this is who must pay.</p>
           <p>Step 3: Put the cost in the Participant Cost box.</p>
           <p>Step 4: In the second box enter the amount they still owe.</p>
           <p>Step 5: Press the save button.</p>
        {/*  </form> */}
       </div>
     ) 
   }
  //const id = open ? 'simple-popover' : undefined;

  // Create a box with a list of the current events
  eventList = (props) => {
    const eventItems = this.state.events.map((event) =>
      <li className="event" key={event.id} onClick={() => {this.eventSelect(event.id)}}>{event.eventName}</li>
    );
    return (
      <ul className="ul">{eventItems}</ul>
    )
  };

 // Create a box with a list of the current participants
  participantList = (props) => {
    const listItems = this.state.secondaryUsers.map((user) =>
      <li className="participants" key={user.id} onClick={() => {this.listSelect(user.id)}}>{user.firstName} {user.lastName}</li>
    );
    return (
      <ul className="ul">{listItems}</ul>
    );
  };

render() {
  const { classes } = this.props;
  const { checked } = this.state;
  //const {anchorEl, setAnchorEl} = React.useState(null);
  //const { open } = Boolean(anchorEl);
  //const { id } = open ? 'simple-popover' : undefined;
  

  return (
    <div className="backGround">
    <Zoom in={checked} >
    <div className={classes.parent}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CardBody className={classes.titleBox}>
              <h3>Create Expense: {this.state.eventName}</h3>
              <h4>Current Vacation: 
              <div className="vacationTitle">{this.props.title}</div></h4>
              <Button className={classes.helpButton}
                    onClick={() => this.displaySwal()}
                    color="rose"
                    size='md'
                    >Help
                </Button>
              </CardBody>
              <CardBody className={classes.cardBody2}>
                <CardBody  className={classes.cardBodyContainer1}>
                  <CardBody> 
                    <h5>Available Events:</h5>{" "}                                
                    <div className="eventsList">
                      {this.eventList()} 
                    </div>          
                  </CardBody>
                  <CardBody> 
                    <h5>Available Participants:</h5>{" "}  
                    {this.state.listVisible ? (
                    <div className="participantsList">
                      {this.participantList()}                                        
                    </div>) : <div className="participantBlock"></div>}
                  </CardBody> 
                </CardBody> 
                <CardBody className={classes.cardBodyContainer2}>           
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
                    Payment Recipient: 
                  </p>            
                  <div className="payee">
                    <p> {this.state.secondaryUserPayeeFirstName} {this.state.secondaryUserPayeeLastName}</p>
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
                        const {formattedValue, value} = values;  
                        this.setState({expenseOwed: formattedValue})
                      }}/>
                  </p>
                  <p> </p>
                </div>
              </Tooltip>
            </CardBody> 
          </CardBody>   
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
          </GridItem>
        </GridContainer>
    </div> 
    </Zoom>
    </div>
    );
  }
}

Expenses.contextType = AppContext;

export default withStyles(styles)(Expenses);