import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
// Components
import AddEvents from "./addEvents.js"
// Material Ui Dashboard Pro
import Button from "../../StyledComponents/Dashboards/Events/js/Button.js";
import GridContainer from "../../StyledComponents/Dashboards/Events/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Events/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Events/js/Card.js";
//import TooltipsStyle from "../../StyledComponents/Dashboards/Events/js/";
import CardBody from "../../StyledComponents/Dashboards/Events/js/CardBody.js";
import withStyles from "@material-ui/core/styles/withStyles";
import "../../StyledComponents/Dashboards/DashBoards.css";
import styles from "../../StyledComponents/Dashboards/Events/styles.js";
import { Zoom, Tooltip } from "@material-ui/core";

/* import {
    tooltip
  } from "assets/jss/material-dashboard-pro-react.js"; */
  

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
    disabled: false,
    participant: "",
    secondaryUsersId: 1,
    secondaryUsers: [],
    checked: false,
    displayEvents: false,
    cost: 0,
   };
};

componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));  
    let usersUid = fire.currentUser.uid;
   
    //this.fetchSecondaryUsers(this.state.vacationsId);
    console.log('vacationsId: ', this.state.vacationsId);
    this.fetchEvents(this.state.vacationsId);

       this.setState({
        usersUid: usersUid
      }); 
    };

addEvent = () => {
    // create a record using the input
    let eventsRec = {
        vacationsId: this.state.vacationsId,
        eventName: this.state.eventName,
        description: this.state.description,
        usersUid: this.state.usersUid,
        cost: this.state.cost,
    }

    axios
        .post('/events/', eventsRec)
        .then(response => {
            console.log("file written");
            // get the id of the new record
            this.fetchId(this.state.eventName);
            this.setState({
                displayEvents: true
            });
        })
        .catch(err => {
            console.log('We"ve encountered an error');
        });  
  }

  fetchId = eventName => {
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
  };

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
  } 

  fetchEvents = (vacationsId) => {
    let events = [];
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
                description: response.data.description,
                cost: response.data.cost,
            }); 
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });

  }

  handleStartDate = startDate => {
    console.log('startdate: ', startDate);
  }

  /* listSelect = (id) => {        
    this.fetchSecondaryUser(id);
  } */

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
      <li key={event.id} className="event" onClick={() => {this.eventSelect(event.id)}}>{event.eventName}</li>
    );
    return (
      <ul className="ul">{eventItems}</ul>
    );
  }

  /* participantList = (props) => {
    const listItems = this.state.secondaryUsers.map((user) =>
      <li key={user.id} className="participants" onClick={() => {this.listSelect(user.id)}}>{user.firstName}, {user.lastName}</li>
    );
    return (
      <ul className="ul">{listItems}</ul>
    );
  } */

render() {
  const { classes } = this.props;
  const { checked } = this.state;
 
    return (
        <div className="events"> 
            <Zoom in={checked} > 
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card style={{ width: "700px", marginLeft: "20px", height: "580px", marginRight: "100px", top: "20px"}}>
                            <h2>Create Event: {this.state.eventName}</h2><Tooltip title="Delete">
                            <h3>Current Vacation: {this.props.title}</h3></Tooltip>
                            <CardBody   className={classes.cardBody2}>
                                <CardBody  className={classes.cardBodyContainer1}>
                               
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
                                    <CardBody  xs={12} sm={12} md={4}>
                                         {this.state.displayEvents ? ( 
                                         <AddEvents 
                                            eventsId={this.state.eventsId}
                                            eventName={this.state.eventName} 
                                            description={this.state.description} 
                                            //title={this.state.title} 
                                            //participant={this.state.participant}
                                            disabled={this.state.disabled}
                                            //secondaryUsersId={this.state.secondaryUsersId}
                                            vacationsId={this.state.vacationsId}
                                            /* startTimeDate={() => this.handleStartDate(this.state.startTimeDate)} */>
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
                                        <h5>Event Cost:{" "}
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
                                        <h3>Available Events:</h3>{" "}                                
                                        <div className="eventsList">
                                            {this.eventList()} 
                                        </div>          
                                    </CardBody>
                                </CardBody>
                            </CardBody>                        
                            <CardBody  className={classes.cardBody}>
                               {/*  <div className="logo"> */}
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
                               
                                <Button  
                                    style={{ marginLeft:"150px"}}
                                    onClick={() => this.addEvent()} 
                                    color="rose">Create
                                </Button> {/* </Tooltip> */}
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

export default withStyles(styles)(Events);