import React from "react";
import { render } from "react-dom";
import Calendar from "./calendar.js";

import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";


const URL = "http://localhost:5500/api";


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
        vacationsId: 1,    //this.props.id,
        eventsId: "",
        eventTitle: "",
        vacation: [],
        events: [],

      };
    }


  componentDidMount() {
    let id = this.state.vacationsId;
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid
    });

    console.log("state: ", this.state)
    // get the data needed to populate the calendar component
    this.fetchVacationData(id);
  }
  
  fetchVacationData = id => {
    axios
      .get(`${URL}/vacations/${id}`)
      .then(response => {
        let vacationData = [];
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
        // grab the events table and then
        // step through it to find all the matches
        // to our vacationId
        if (response.data) {
            response.data.forEach((event, index) => {
                console.log("event.vacationsId: ", event.vacationsId)
                console.log("id: ", id) 
                if (event.vacationsId === id) {
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