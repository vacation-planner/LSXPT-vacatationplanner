import React from 'react'
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import { Calendar as  BigCalendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment";
//import "react-big-calendar/lib/css/react-big-calendar.css";
//import "../../StyledComponents/Dashboards/Events/Calendar.css";
//import "../../StyledComponents/Dashboards/Events/material-dashboard-pro-react.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';


const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

 let eventSave = [];
 /* const events = [
    {
      id: 0,
      title: 'vacation meeting',
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: 'MS training',
      start: new Date(2018, 0, 29, 14, 0, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Team lead meeting',
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 10,
      title: 'vac2 meeting',
      start: new Date(2018, 0, 30, 23, 0, 0),
      end: new Date(2018, 0, 30, 23, 59, 0),
      resourceId: 1,
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2018, 0, 30, 7, 0, 0),
      end: new Date(2018, 0, 30, 10, 30, 0),
      resourceId: 4,
    },
    {
      id: 12,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 23, 59, 0),
      end: new Date(2018, 0, 30, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 13,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 23, 50, 0),
      end: new Date(2018, 0, 30, 13, 0, 0),
      resourceId: 2,
    },
    {
      id: 14,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 23, 40, 0),
      end: new Date(2018, 0, 30, 13, 0, 0),
      resourceId: 4,
    },
  ]   */
  
const resourceMap = [
  { resourceId: 1, resourceTitle: 'Vacation Date' },
  { resourceId: 2, resourceTitle: 'Event' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]


class EventsCalendar extends React.Component {
  constructor(props) {
     super(props)  
    
    this.state = {
      uid: "",
      vacationsId: 1,    //this.props.id,
      vacation: [],
      events: [],
      eventData: [],
    }

    this.moveEvent = this.moveEvent.bind(this)
    
  }

  componentDidMount() {
    let id = this.state.vacationsId;
    let uid = fire.currentUser.uid;

    this.setState({
      uid: uid,
     /*  events: events, */
    });
    console.log("state: ", this.state)
    // get the data needed to populate the calendar component

    this.fetchEventData(id);
  }
  
  fetchEventData = id => {
    axios
      .get(`${URL}/events/`)
      .then(response => {
        let eventsData = [];
 
        if (response.data) {
            response.data.forEach((event, index) => {
                if (event.vacationsId === id) {
                    eventsData.push(event);
                }
            })   
        };
        
        console.log("eventsData: ", eventsData)
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
        start: item.startTimeDate,
        end: item.endTimeDate,
        desc: item.description
      })  
        
    })

  console.log("events: ", events)
  this.setState({
    events: events
  });

  }

 
  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

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
  render() {
    return (
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={this.state.events}
        onEventDrop={event => this.moveEvent(event)}
        resizable
        resources={resourceMap} 
        resourceIdAccessor="resourceId" 
        resourceTitleAccessor="resourceTitle" 
        onEventResize={this.resizeEvent}
        defaultView="month"
        step={15}
        showMultiDayTimes={true}
        defaultDate={new Date(2018, 1, 29)}
        eventPropGetter={event => this.eventStyleGetter(event)}
      />
    )
  }
}

export default EventsCalendar