import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
//import Events from "./events";
import moment from "moment";

//import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import { events } from "../../StyledComponents/Dashboards/Calendar/js/general.js";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

const localizer = momentLocalizer(moment)
  
class Cal extends Component {
  constructor(props) {
    super(props);
  this.state = {
    events: this.props.events,
    date: new Date(2019, 11, 12)
  
    
    /* [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ] */
  };
}

selectedEvent = event => {
  console.log("in the selectedevent: ", event)
}

addNewEventAlert = slotInfo => {
  console.log("in the addnew: ", slotInfo)

}

  render() {
    return (
      <div className="Cal">
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.events}
          onSelectEvent={event => this.selectedEvent(event)}
          style={{ height: "100vh" }}
          onNavigate={date => this.setState({ date })}
          onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
        />
      </div>
    );
  }
}

export default Cal;