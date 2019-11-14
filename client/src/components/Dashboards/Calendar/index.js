import React from "react";
import { render } from "react-dom";
import Calendar from "./calendar.js";
// react components used to create a calendar with events on it
//import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
//import moment from "moment";
// react component used to create alerts
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
//import SweetAlert from "react-bootstrap-sweetalert";
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

//import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
//import "react-big-calendar/lib/css/react-big-calendar.css";
//import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";

// core components
//import Heading from "../../StyledComponents/Dashboards/Calendar/js/Heading.js";
//import GridContainer from "../../StyledComponents/Dashboards/Calendar/js/GridContainer.js";
//import GridItem from "../../StyledComponents/Dashboards/Calendar/js/GridItem.js";
//import Card from "../../StyledComponents/Dashboards/Calendar/js/Card.js";
//import CardBody from "../../StyledComponents/Dashboards/Calendar/js/CardBody";

//import styles from "../../StyledComponents/Dashboards/Calendar/js/buttonStyle.js";

//import { events as calendarEvents } from "../../StyledComponents/Dashboards/Calendar/js/general.js";

const URL = "http://localhost:5500/api";

//const localizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

//const useStyles = makeStyles(styles);
//const classes = useStyles();
//const [events, setEvents] = React.useState(calendarEvents);
//const [alert, setAlert] = React.useState(null);

//export default function Calendar() {
  class Vacation extends React.Component {
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
        events: [],

      };
    }
//export default function Calendar() {

  componentDidMount() {
    let id = this.state.vacationId;
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid
    });

    console.log("state: ", this.state)
    // get the account balance for the user from the user table
    this.fetchVacationData(id);
  }
  
  fetchVacationData = id => {
    axios
      .get(`${URL}/vacations/${id}`)
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
        this.fetchEventData(id)
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };
 
  fetchEventData = id => {
    axios
      .get(`${URL}/events/`)
      .then(response => {
        let eventsData = [];
        // I grab the events table and then
        // step through it to find all the matches
        // to our vacationId
        if (response.data) {
            response.data.forEach((event, index) => {
                console.log("event.vacationId: ", event.vacationId)
                console.log("id: ", id)
                
                if (event.vacationId === id) {
                    eventsData.push(event);
                }
            })
        
        };
        console.log("eventsData: ", eventsData)
        this.setState({
          events: eventsData
        });
        // at this point we have all the data we need
        // now we need to put it into the proper format
        
        //this.calendarHandler();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };
render () {

  return (
  <div>
      <Calendar>
          </Calendar>

      </div>
  );
}
}
export default Vacation;