import React, { Component } from "react";
import { render } from "react-dom";
import events from "./events";
import { Calendar, BigCalendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fire } from "../../Auth/firebaseConfig";

moment.locale("en");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);

class Cal extends Component {
  state = {
    view: "month",
    date: new Date(2019, 11, 12),
    width: 500
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      /*this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });*/
    });
  }

  render() {
    return (
      <div style={{ height: 700 }}>
        <button onClick={() => this.setState({ view: "day" })}>Day</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button>
        <Calendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={events}
          step={60}
          views={allViews}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    );
  }
}

export default Cal;
//render(<Calendar />, document.getElementById("root"));