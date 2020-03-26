import React from 'react'
import axios from "axios";
import { AppContext } from '../../Context/AppContext.js';
import { fire } from "../../Auth/firebaseConfig";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
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
import { Zoom } from "@material-ui/core";

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
  },
  vacationsButton: {
    display: "flex",
    left: "120px",
  },
  eventsButton: {
    display: "flex",
    left: "140px",
  }
});

class EventsCalendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uid: "",
      vacationsId: this.props.vacationsId,
      display: [],
      vacation: [],
      events: [],
      eventData: [],
      eventName: "",
      description: "",
      value: "",
      premium: false,
      vacationsDisabled: true,
      eventsDisabled: false,
      checked: false,
    }
    this.moveEvent = this.moveEvent.bind(this)
  }

  componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid,
    });

    this.fetchVacationData(this.props.vacationsId);
  }

  fetchEventData = vacationsId => {
    axios
      .get('/events/')
      .then(response => {
        let eventsData = [];
        if (response.data) {
          response.data.forEach((event, index) => {
            if (event.vacationsId === vacationsId) {
              eventsData.push(event);
            }
          })
        };
        this.setState({
          eventData: eventsData,
          display: eventsData
        });
        this.formatData1();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  formatData1 = () => {
    let events = [];
    this.state.eventData.forEach((item, index) => {
      events.push({
        title: item.eventName,
        start: item.startDateTime,
        end: item.endDateTime,
        desc: item.description
      })
    })
    this.setState({
      display: events,
      vacationsDisabled: false,
      eventsDisabled: true
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: this.props.value + event.target.value
    });
    console.log("value: ", event.target.value)
  };

  // when you click an existing event
  selectedEvent = event => {
   /*  console.log("in the addnew: ", slotInfo)
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

    this.writeToDb(slotInfo); */


//###########################################

  /*   console.log("in the selected event: ", event)
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
        </form>
      </div>
    ) */
  }

  fetchVacationData = (vacationsId) => {
    if (this.props.vacationsId !== undefined) {
      axios
        .get(`/vacations/${vacationsId}`)
        .then(response => {
          let vacationData = [];
          if (response.data) {
            response.data.forEach((vacation, index) => {
              vacationData.push(vacation);
            })
          };
          this.setState({
            vacation: vacationData,
          });
          this.formatData();
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
    else {
      axios
        .get(`/vacations/${this.context.state.tempVacationHolder.id}`)
        .then(response => {
          let vacationData = [];
          if (response.data) {
            response.data.forEach((vacation, index) => {
              vacationData.push(vacation);
            })
          };
          console.log("vacationData: ", vacationData)
          this.setState({
            vacation: vacationData,
          });
          this.formatData();
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
  };

  formatData = () => {
    let display = [];
    this.state.vacation.forEach((item, index) => {

      display.push({
        //id: item.id,
        title: item.title,
        start: item.startDate,
        end: item.endDate,
        desc: item.location,
      })
    })
    this.setState({
      display: display,
      vacationsDisabled: true,
      eventsDisabled: false
    });
  }

  addNewEventAlert = slotInfo => {
    /* console.log("in the selected event: ", event)
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
        </form>
      </div>
    ) */
    
    
   /*  console.log("in the addnew: ", slotInfo)
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

    this.writeToDb(slotInfo); */
  }

  // ******************************************************
  // this cant be left in the app, if we do decide to let
  // the user create new events from the calander then
  // we must correct this code
  // ******************************************************
  writeToDb = slotInfo => {
    const eventRec = {
      eventName: "test",  // FIX THIS!!
      vacationsId: this.props.vacationsId,
      startDateTime: slotInfo.start,
      endDateTime: slotInfo.end,
      description: "item.location", // FIX THIS!
    }
    axios
      .post('/events/', eventRec)
      .then(response => {
        console.log("file written")
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  }

  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    //console.log("In the move event");

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

  colorPicker = (rndInteger) => {
    let hexColor = "";

    // use switch
    switch (rndInteger) {

      case 1:
        hexColor = "#04068a";
        break;
      case 2:
        hexColor = "#3f022b";
        break;
      case 3:
        hexColor = "#0e0eca";
        break;
      case 4:
        hexColor = "#18e4c2";
        break;
      case 5:
        hexColor = "#e1e418";
        break;
      case 6:
        hexColor = "#e41818";
    }
    return hexColor;
  }

  eventStyleGetter = (event) => {
    // *************************************************************
    // Use this function to generate a random integer
    // the number is then used to choose from 6 prechosen colors
    // the events really need to be different colors in the calendar
    // *************************************************************
    //let rndNbr = this.getRndInteger(1,6);
    let backgroundColor = this.colorPicker(this.getRndInteger(1,1)); 
    // used a function with a switch statement to determine which color will be used
    //let backgroundColor = hexColor;
     // new color is applied to the style
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
    const { checked } = this.state;

    return (
      <div className="events-calendar-container">
        <Zoom in={checked} >
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ marginLeft: "20px", height: "600px", width: "540px", top: "0px", }}>
                <CardBody>
                  <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.display}
                    onEventDrop={event => this.moveEvent(event)}
                    onSelectEvent={event => this.selectedEvent(event)}
                    onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
                    resizable
                    onEventResize={this.resizeEvent}
                    defaultView="month"
                    step={15}
                    showMultiDayTimes={true}
                    defaultDate={new Date()}
                    eventPropGetter={event => this.eventStyleGetter(event)}
                  />
                </CardBody>
                <CardBody className={classes.lowerCardBody}>
                  <Button className={classes.vacationsButton}
                    onClick={() => this.fetchVacationData(this.props.vacationsId)}
                    color="rose"
                    disabled={this.state.vacationsDisabled}>Vacations
                </Button>
                  <Button className={classes.eventsButton}
                    onClick={() => this.fetchEventData(this.props.vacationsId)}
                    color="rose"
                    disabled={this.state.eventsDisabled}>Events
                </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Zoom>
      </div>
    )
  }
}

EventsCalendar.contextType = AppContext;

export default withStyles(styles)(EventsCalendar)