import React from 'react'
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import { Calendar as  BigCalendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment";
import swal from '@sweetalert/with-react'
import Card from "../../StyledComponents/Dashboards/Events/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Events/js/CardBody.js";
import GridContainer from "../../StyledComponents/Dashboards/Events/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Events/js/GridItem.js";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "../../StyledComponents/Dashboards/Events/js/Button.js";
//import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../StyledComponents/Dashboards/Events/Calendar.css";
//import "../../StyledComponents/Dashboards/Events/material-dashboard-pro-react.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';

const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const styles = theme => ({
  lowerCardBody: {
      display: "flex",
      width: "100%",
      height: "100px",
      backgroundColor: "#E91E63",
      /* justifyContent: "space-between", */
       /* backgroundColor: "#23b0e7", */  
      /* height: "10%", */
      [theme.breakpoints.up("sm")]: {
          width: "100%",    
      }
  }
});

//  let eventSave = [];
 /* const events = [
    {
      id: 0,
      title: 'vacation meeting',
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1,   
    },
  ]   */
  
// const resourceMap = [
//   { resourceId: 1, resourceTitle: 'Vacation Date' },
//   { resourceId: 2, resourceTitle: 'Event' },
//   { resourceId: 3, resourceTitle: 'Meeting room 1' },
//   { resourceId: 4, resourceTitle: 'Meeting room 2' },
// ]


class EventsCalendar extends React.Component {
  constructor(props) {
     super(props)  
    
    this.state = {
      uid: "",
      vacationsId: this.props.vacationsId,
      vacation: [],
      events: [],
      eventData: [],
      eventName: "",
      description: "",
      value: "",
    }

    this.moveEvent = this.moveEvent.bind(this)
    
  }

  componentDidMount() {
    let vacationsId = this.state.vacationsId;
    let uid = fire.currentUser.uid;

    this.setState({
      uid: uid,
     /*  events: events, */
    });
   // console.log("state: ", this.state)
    // get the data needed to populate the calendar component

    this.fetchEventData(vacationsId);
  }
  
  fetchEventData = vacationsId => {
    axios
      .get(`${URL}/events/`)
      .then(response => {
        let eventsData = [];
 
        if (response.data) {
            response.data.forEach((event, index) => {
                if (event.vacationsId === vacationsId) {
                    eventsData.push(event);
                }
            })   
        };
        
       // console.log("eventsData: ", eventsData)
        this.setState({
          eventData: eventsData
        });
               
        this.formatData();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  formatData = () => {
 
    //let vacationDate = [];
    let events = [];
    
    this.state.eventData.forEach((item, index) => {
     
      events.push({
        //id: item.id,
        title: item.eventName,
        start: item.startDateTime,
        end: item.endDateTime,
        desc: item.description
      })  
        
    })

  //console.log("events: ", events)
  this.setState({
    events: events
  });

  }

 /*  handleChange = event => {
    this.setState({[event.target.name]: this.state.value + event.target.value});
    console.log("value: ", this.state.value)
  } */
  handleChange = event => {
    this.setState({
        [event.target.name]:  this.props.value +  event.target.value
  });
  console.log("value: ", event.target.value) 
  };

  selectedEvent = event => {
    //console.log("in the selectedevent: ", event)
    swal(
      <div>
        <form onSubmit={this.submitForm} >
          <h1>Hello!</h1>        
          <p>Please enter a name for the event:</p>
          <input 
            type="text"
            name="eventName"
            onChange={this.handleChange}
            value={this.props.value}
            className="eventName"
          />
           <p>Please enter a description for the event:</p>
          <input 
            type="text" 
            name="description"
            onChange={this.handleChange}
            value={this.props.value}
            className="description"
          />
         {/*  <input 
            type="submit" 
            value="Submit" 
          /> */}
        </form>
      </div>
    )
  }
 
  addNewEventAlert = slotInfo => {
    console.log("in the addnew: ", slotInfo)
    let events = this.state.events;
    //slotInfo.slots.forEach((vacation, index) => {
   
    events.push({
      //id: item.id,
      title: "test",
      start: slotInfo.start,
      end: slotInfo.end,
      desc: "item.location",
    }) 
  //})
    console.log("events: ", events)
    this.setState({
      events: events
    });
  
    this.writeToDb(slotInfo); 
  }

  writeToDb = slotInfo => {
    const eventRec = {
      eventName: "test",
      vacationsId: this.props.vacationsId,
      startDateTime: slotInfo.start,
      endDateTime: slotInfo.end,
      description: "item.location",
  
    }
    axios
    .post(`${URL}/events/`, eventRec)
    .then(response => {
      console.log("file written")
     })
    .catch(err => {
      console.log('We"ve encountered an error');
    });
  }

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    console.log("In the move event");

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  eventStyleGetter = (event) => {
    //console.log("this.event.resouceId: ", event.resourceId);
    //const { events } = this.state
    let hexColor = "";
        if (event.resourceId === 1) { 
            hexColor = "04068a"
            
        } else {
            hexColor = "3f022b"
        }
       
     // console.log("hexColor: ", hexColor);
      let backgroundColor = '#' + hexColor;
    let style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
  }

  submitForm = () => {
    // save the data to db
    window.alert("alert")
  }


  render() {
    const { classes } = this.props;

    return (
      <div className="events-calendar-container">
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
      <Card style={{ marginLeft: "20px", height: "600px", width: "540px", top: "0px", }}>
      <CardBody>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={this.state.events}
        onEventDrop={event => this.moveEvent(event)}
        onSelectEvent={event => this.selectedEvent(event)}
        onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
        resizable
       /*  resources={resourceMap}  */
       /*  resourceIdAccessor="resourceId"  */
       /*  resourceTitleAccessor="resourceTitle"  */
        onEventResize={this.resizeEvent}
        defaultView="month"
        step={15}
        showMultiDayTimes={true}
        defaultDate={new Date(2019, 11, 29)}
        eventPropGetter={event => this.eventStyleGetter(event)}
      />
       </CardBody>
       <CardBody  className={classes.lowerCardBody}>
       <Button  
                                onClick={() => this.displayVacations()} 
                                color="rose">Vacations
                            </Button>
                            <Button  
                                onClick={() => this.displayEvents()} 
                                color="rose"
                                disabled={this.state.disabled}>Events
                            </Button>                                  
         </CardBody>
    </Card>
    </GridItem>
        </GridContainer>
        </div>
    )
  }
}

export default withStyles(styles)(EventsCalendar)