import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment";

// *************************************************
// the calendar gets its styles from the index page
// *************************************************

const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(Calendar)

 let eventSave = [];

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Vacation Date' },
  { resourceId: 2, resourceTitle: 'Event' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

class Dnd extends React.Component {
  constructor(props) {
     super(props)  
    
    this.state = {
      events: this.props.events,
    }

    this.moveEvent = this.moveEvent.bind(this)
    
  }

  componentDidMount() {
    //let usersUid = fire.currentUser.uid;
     this.setState({
     events: this.props.events
   });  
   eventSave = this.state;
   //console.log("eventSave: ", eventSave)
 };
 
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
        events={this.props.events}
        onEventDrop={event => this.moveEvent(event)}
        resizable
        resources={resourceMap} 
        resourceIdAccessor="resourceId" 
        resourceTitleAccessor="resourceTitle" 
        onEventResize={this.resizeEvent}
        defaultView="month"
        step={15}
        showMultiDayTimes={true}
        defaultDate={new Date(2019, 11, 29)}
        eventPropGetter={event => this.eventStyleGetter(event)}
      />
    )
  }
}

export default Dnd