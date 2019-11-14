import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import Events from "./events";
import moment from "moment";

//import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
  
class Cal extends Component {
  state = {
    events: Events,
    date: new Date(2019, 11, 12)
  
    
    /* [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ] */
  };



  render() {
    return (
      <div className="Cal">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    );
  }
}

export default Cal;