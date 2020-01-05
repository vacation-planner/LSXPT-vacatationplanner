import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import swal from '@sweetalert/with-react'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";
const localizer = momentLocalizer(moment)
  
class Cal extends Component {
  constructor(props) {
    super(props);
  this.state = {
    events: this.props.events,
    date: new Date(2019, 11, 12), 
    uid: "",
    value: "",
   };
}
//let events = this.props.events;
componentDidMount() {
  //let id = this.state.vacationsId;
  let uid = fire.currentUser.uid;
   this.setState({
    uid: uid
  }); 

  console.log("state: ", this.state)
}

selectedEvent = event => {
  console.log("in the selectedevent: ", event)
  swal(
    <div>
      <form onSubmit={this.submitForm()} >
        <h1>Hello!</h1>        
        <p>Please enter a name for the event:</p>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

handleChange = event => {
  this.setState({value: this.state.value + event.target.value});
  console.log("value: ", this.state.value)
}

addNewEventAlert = slotInfo => {
  console.log("in the addnew: ", slotInfo)
  let events = this.props.events;
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
  const vacationRec = {
  title: "test",
    startDate: slotInfo.start,
    endDate: slotInfo.end,
    location: "item.location",
    usersUid: this.state.uid,
  }
  axios
  .post(`${URL}/vacations/`, vacationRec)
  .then(response => {
    console.log("file written")
   })
  .catch(err => {
    console.log('We"ve encountered an error');
  });
}

eventStyleGetter = (event) => {
  console.log("Here we are: ", event);
  
  var backgroundColor = '#' + "04068a";
  var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
  };
  return {
      style: style
  };
}

eventColors = event => {
  console.log("event.color: ", event.color)  
  let backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };

  submitForm = () => {
    // save the data to db
    window.alert("alert")
  }

  render() {
<<<<<<< HEAD:client/src/components/Dashboards/Calendar/calendar.js
    // const { events } = this.state
=======
    /* const { events } = this.state */
>>>>>>> 84b553981bcff936206e753180c38394426f21f3:client/src/components/Dashboards/Calendar/old_calendar.js
    return (
      <div className="Cal">
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.events}
          onSelectEvent={event => this.selectedEvent(event)}
         /*  style={{ height: "100vh" }} */
          onNavigate={date => this.setState({ date })}
          onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
          eventPropGetter={event => this.eventStyleGetter(event)}
        />
      </div>
    );
  }
}

export default Cal;