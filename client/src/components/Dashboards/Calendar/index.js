import React from "react";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
//import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "../../StyledComponents/Dashboards/Calendar/js/Heading.js";
import GridContainer from "../../StyledComponents/Dashboards/Calendar/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Calendar/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Calendar/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Calendar/js/CardBody";

import styles from "../../StyledComponents/Dashboards/Calendar/js/buttonStyle.js";

import { events as calendarEvents } from "../../StyledComponents/Dashboards/Calendar/js/general.js";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const useStyles = makeStyles(styles);

export default function Calendar() {
  const classes = useStyles();
  const [events, setEvents] = React.useState(calendarEvents);
  const [alert, setAlert] = React.useState(null);
  
  const selectedEvent = event => {
    window.alert(event.title)
    //rwindow.alert("Now what?");
  };
  const addNewEventAlert = slotInfo => {
    console.log("slot info: ", slotInfo)
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
    console.log("in the addNewEvent")
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
    let backgroundColor = "event-";
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
      
      
    />
  );
}