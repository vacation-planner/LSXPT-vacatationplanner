import React, { Component } from "react";
import axios from "axios";
import { AppContext } from '../../Context/AppContext.js';
import { fire } from "../../Auth/firebaseConfig";
// Components
import AddEvents from "./addEvents.js"
// Material Ui Dashboard Pro
import Button from "../../StyledComponents/Dashboards/Events/js/Button.js";
import GridContainer from "../../StyledComponents/Dashboards/Events/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Events/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Events/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Events/js/CardBody.js";
import withStyles from "@material-ui/core/styles/withStyles";
import swal from '@sweetalert/with-react';
import "../../StyledComponents/Dashboards/DashBoards.css";
import styles from "../../StyledComponents/Dashboards/Events/styles.js";
import { Zoom, Tooltip, Typography } from "@material-ui/core";

class Events extends Component {
  constructor(props) {
    super(props);
  this.state = {
    usersUid: "",
    value: "",
    eventName: "",
    title: this.props.title,
    vacationsId: this.props.vacationsId,
    startDateTime: "",
    endDateTime: "",
    description: "",
    eventsId: "",
    events: [],
    disabled: true,
    participant: "",
    secondaryUsersId: "",
    secondaryUsers: [],
    secondaryUsersFirstName: "",
    secondaryUsersLastName: "",
    checked: false,
    displayEvents: false,
    cost: "",
    listVisible: false,
    editFlag: false,
   };
};

componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));  
    let usersUid = fire.currentUser.uid;

    //this.fetchSecondaryUsers(this.state.vacationsId);
    console.log('vacationsId: ', this.state.vacationsId);
    this.fetchEvents(this.state.vacationsId);
     // grab the list of secondary users
     this.fetchSecondaryUsers(this.state.vacationsId);

    this.setState({
      usersUid: usersUid
    });
  };

  addEvent = () => {
    // create a record using the input
    // the secondaryUsersId is a pointer to the payment recipient,
    // it is who the money is owed to.
    // also need to do either a PUT or a POST.
    let eventsRec = {
        vacationsId: this.state.vacationsId,
        eventName: this.state.eventName,
        description: this.state.description,
        usersUid: this.state.usersUid,
        cost: this.state.cost,
        secondaryUsersId: this.state.secondaryUsersId,
    }
    if (this.state.editFlag === false) {
    axios
      .post('/events/', eventsRec)
      .then(response => {
        console.log("file written");
        // get the id of the new record
        this.fetchId(this.state.eventName);
        this.setState({
          displayEvents: true,
          disabled: true,
        });
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  } else {
    axios
    .put(`/events/${this.state.eventsId}`, eventsRec)
    .then(response => {
      console.log("record updated");
      // get the id of the new record
      this.fetchId(this.state.eventName);
      this.setState({
        editFlag: false
      });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });

    }
    this.setState({
      eventName: "",
      //startDateTime: response.data.startDateTime,
      //endDateTime: response.data.endDateTime,
      description: "",
      cost: "",
      secondaryUsersFirstName: "",
      secondaryUsersLastName: "",
      editFlag: false,
  });
  setTimeout(() => {
    this.fetchEvents(this.state.vacationsId);
    // grab the list of secondary users
    this.fetchSecondaryUsers(this.state.vacationsId);
  }, 1000); 
  }

  fetchId = eventName => {
    axios
      .get('/events')
      .then(response => {
        response.data.forEach((item, index) => {
          if (item.eventName === this.state.eventName) {
            this.setState({
              eventsId: item.id,
              disabled: true
            });
          }
        });
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  // grab the first and last name of the selected secondary user
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
  }

  // grabs all the secondary users
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

 // grabs all the events
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
            this.setState({
              events: events
            });
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
            this.setState({
              events: events,
              vacationsId: this.context.state.tempVacationHolder.id,
            });
          });
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
  }

  // we have to do two lookups
  fetchEvent = (eventsId) => {
    //let events = [];
    axios
    .get(`/events/${eventsId}`)
    .then(response => {         
             this.setState({
                eventsId: eventsId,
                eventName: response.data.eventName,
                startDateTime: response.data.startDateTime,
                endDateTime: response.data.endDateTime,
                description: response.data.description, // *** should probably display this somewhere ***
                cost: response.data.cost,
                secondaryUsersId: response.data.secondaryUsersId,
                listVisible: true,
                secondaryUsersFirstName: "",
                secondaryUsersLastName: "",
                editFlag: true,
            });
            console.log('secondaryUsersId: ',this.state.secondaryUsersId);
          if ((this.state.secondaryUsersId !== "") && (this.state.secondaryUsersId !== null)) {
            // need to get the secondaryUser's name from the table for display purposes
            this.fetchSecondaryUser(this.state.secondaryUsersId);
          } 
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });

  }

  displaySwal = event => {
    // display a alert type box.
    swal(
      <div className="helpBox">
       {/*  <form onSubmit={this.submitForm} > */}
          <h4>Help - Create/Edit an Event</h4>
          <p></p>
          <p>Step 1: Enter the name of a new event in the first field .</p>
          <p>Step 2: To edit an event, select it from the Available Events .</p>
          <p>Step 3: Add a description (optional).</p>
          <p>Step 4: Enter the cost of the event (optional)</p>
          <p>Step 5: Select the participant that the money is owed to.</p>
          <p>Step 6: Press the Save/Update button when completed.</p>
       {/*  </form> */}
      </div>
    ) 
  }

  listSelect = (id) => {        
    this.fetchSecondaryUser(id);
  } 

  eventSelect = (id) => {
    this.fetchEvent(id);
    this.setState({
      displayEvents: true
    });

  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  eventList = (props) => {
    const eventItems = this.state.events.map((event) =>
      <li key={event.id} className="event" onClick={() => { this.eventSelect(event.id) }}>{event.eventName}</li>
    );
    return (
      <ul className="ul">{eventItems}</ul>
    );
  }

   participantList = (props) => {
    const listItems = this.state.secondaryUsers.map((user) =>
      <li key={user.id} className="participants" onClick={() => {this.listSelect(user.id)}}>{user.firstName}, {user.lastName}</li>
    );
    return (
      <ul className="ul">{listItems}</ul>
    );
  } 

  render() {
    const { classes } = this.props;
    const { checked, editFlag } = this.state;
    return (
      <div className="events">
        <Zoom in={checked} >
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           {/*  <Card style={{ width: "700px", marginLeft: "20px", height: "auto", marginRight: "100px", top: "20px" }}>rd style={{ width: "700px", marginLeft: "20px", height: "auto", marginRight: "100px", top: "20px" }}> */}
             
              <Card className={classes.parent}>
              <div className={classes.helpDiv}>
              <Button className={classes.helpButton}
                    onClick={() => this.displaySwal()}
                    color="rose"
                    /* size='lg' */
                    >Help
                </Button>
                </div>
                <h2>Create Event: {this.state.eventName}</h2>
                <Tooltip
                 title={
                  <Typography color="inherit" variant="h5">
                    Enter a new event into the box or select one from the Events Available box.
                  </Typography>
                }>
                  <h3>Current Vacation: {this.props.title}</h3>
                </Tooltip>
                <CardBody className={classes.cardBody2}>
                  <CardBody className={classes.cardBodyContainer1}>
                    <CardBody>
                      <h5>Name of New Event:{" "}
                        <input
                          type="text"
                          name="eventName"
                          onChange={this.handleChange}
                          value={this.state.eventName}
                          className="eventName"
                          placeholder={this.state.eventName}
                        />
                      </h5>
                    </CardBody>
                    <CardBody xs={12} sm={12} md={4}>
                      {this.state.displayEvents ? (
                        <AddEvents
                          eventsId={this.state.eventsId}
                          eventName={this.state.eventName}
                          description={this.state.description}                    
                          disabled={this.state.disabled}
                          vacationsId={this.state.vacationsId}
                        >
                                        </AddEvents>  
                                         ) : null}
                                    </CardBody>   
                                </CardBody>
                                <CardBody  className={classes.cardBodyContainer2}>
                                    <CardBody> 
                                        <h5>Event Description:{" "}
                                            <input
                                                type="text"
                                                name="description"
                                                onChange={this.handleChange}
                                                value={this.state.description}
                                                className="description"
                                            />  
                                        </h5>
                                    </CardBody>
                                    <CardBody> 
                                        <h5>Event Total Cost:{" "}
                                            <input
                                                type="text"
                                                name="cost"
                                                onChange={this.handleChange}
                                                value={this.state.cost}
                                                className="cost"
                                            />  
                                        </h5>
                                    </CardBody>
                                    <CardBody> 
                                      <h4>Payment Recipient (select from list): </h4>
                                      <div className="participant">
                                      <p> {this.state.secondaryUsersFirstName} {this.state.secondaryUsersLastName}</p>
                                      </div>
                                    </CardBody> 
                                    <CardBody> 
                                      <h3>Available Events:</h3>{" "}                                
                                      <div className="eventsList">
                                          {this.eventList()} 
                                        </div>      
                                    </CardBody>
                                    <CardBody> 
                                      <h3>Available Payment Recipients:</h3>{" "}  
                                        {this.state.listVisible ? (
                                      <div className="participantsList">
                                        {this.participantList()}                                        
                                      </div>) : <div className="participantBlock"></div>}
                                    </CardBody> 
                                </CardBody>
                            </CardBody>                        
                            <CardBody  className={classes.cardBodyContainer3}>
                                <div className="logo">
                  </div>{/*  <Tooltip
                                placement="top"
                                disableFocusListener
                                title={
                                    <Typography color="inherit" variant="h5">
                                        Create an expense and optionally assign it to an event. To do this, click on the event before saving.
                                    </Typography>
                                }
                            > */}
                {editFlag ? (
                  <Button
                    style={{ marginLeft: "150px" }}
                    onClick={() => this.addEvent()}
                    color="rose">Update
                </Button> ) : (
                  <Button
                    style={{ marginLeft: "150px" }}
                    onClick={() => this.addEvent()}
                    color="rose">Create
                  </Button>)}
                  <Button
                    onClick={() => this.removeEvent()}
                    color="rose"
                    disabled={true}>Remove
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Zoom>
      </div>
    );
  }
}

Events.contextType = AppContext;

export default withStyles(styles)(Events);