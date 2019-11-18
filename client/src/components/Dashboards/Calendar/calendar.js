import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

const localizer = momentLocalizer(moment)
  
class Cal extends Component {
  constructor(props) {
    super(props);
  this.state = {
    events: this.props.events,
    date: new Date(2019, 11, 12) 
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