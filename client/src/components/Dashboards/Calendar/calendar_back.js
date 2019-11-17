/*eslint-disable*/
import React from "react";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
/* import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js"; */


import styles from "../../StyledComponents/Dashboards/Calendar/js/buttonStyle.js";
import { events as calendarEvents } from "../../StyledComponents/Dashboards/Calendar/js/general.js";


const localizer = momentLocalizer(moment);

const useStyles = makeStyles(styles);

export default function Calendar() {
  const classes = useStyles();
  const [events, setEvents] = React.useState(calendarEvents);
  const [alert, setAlert] = React.useState(null);
  const selectedEvent = event => {
    window.alert(event.title);
  };
  const addNewEventAlert = slotInfo => {
    setAlert(
      <SweetAlert
        input
        showCancel
        style={{ display: "block", marginTop: "-100px" }}
        title="Input something"
        onConfirm={e => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
      />
    );
  };
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    setAlert(null);
    setEvents(newEvents);
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const eventColors = event => {
    console.log("in the eventColors")
    console.log("event.color: ", event.color)
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };
  return (
    <BigCalendar
      selectable
      localizer={localizer}
      events={events}
      defaultView="month"
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date()}
      onSelectEvent={event => selectedEvent(event)}
      onSelectSlot={slotInfo => addNewEventAlert(slotInfo)}
      eventPropGetter={eventColors}
      eventBackgroundColor="red"
    />
  );
}