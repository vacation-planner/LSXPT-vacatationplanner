import React from "react";
import { render } from "react-dom";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import SweetAlert from "react-bootstrap-sweetalert";
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
//import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

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

const URL = "http://localhost:5500/api";

const localizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

//const useStyles = makeStyles(styles);
//const classes = useStyles();
//const [events, setEvents] = React.useState(calendarEvents);
//const [alert, setAlert] = React.useState(null);

//export default function Calendar() {
  class Calendar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startDate: [], 
        endDate: [],
        startTime: [],
        endTime: 0,
        vacationTitle: "",
        vacationLocation: "",
        uid: "",
        vacationId: 1,    //this.props.id,
        eventId: "",
        eventTitle: "",
        vacation: [],

      };
    }
//export default function Calendar() {

  componentDidMount() {
    let id = this.state.vacationId;
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid
    });
    // get the account balance for the user from the user table
    this.fetchVacationData(id);
  }
  
  fetchVacationData = id => {
    axios
      .get(`${URL}/vacations`)
      .then(response => {
        let vacationData = [];
        // if we have something in response
        // then push it to our array
        if (response.data) {
          response.data.forEach((vacation, index) => {
          //if (vacation.id === id) {
            vacationData.push(vacation);
          })
        };
        console.log("vacationData: ", vacationData)
        this.setState({
          vacation: vacationData
        });
        // call the calendar handler function
        //this.calendarHandler();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };


  selectedEvent = event => {
    window.alert(event.title)
    //rwindow.alert("Now what?");
  };
  
  addNewEventAlert = slotInfo => {
    console.log("slot info: ", slotInfo)
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    this.setAlert(
     /*  <SweetAlert
        input
        showCancel
        style={{ display: "block", marginTop: "-100px" }}
        title="Input something"
        onConfirm={e => this.addNewEvent(e, slotInfo)}
        onCancel={() => this.hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
      /> */
    );
  };

  addNewEvent = (e, slotInfo) => {
    console.log("in the addNewEvent")
    let newEvents = this.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    this.setAlert(null);
    this.setEvents(newEvents);
  };

  hideAlert = () => {
    this.setAlert(null);
  };

  eventColors = event => {
    console.log("in the eventColors")
    let backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };

render () {

  //const classes = useStyles();
  //const [events, setEvents] = React.useState(calendarEvents);
  //const [alert, setAlert] = React.useState(null);



  return (
    <BigCalendar
      selectable
      localizer={localizer}
      events={this.events}
      defaultView="month"
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date()}
      onSelectEvent={event => this.selectedEvent(event)}
      onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
      eventPropGetter={this.eventColors}
      
      
    />
  );
}
}
export default Calendar;