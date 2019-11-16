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
        eventData: [],

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
          eventData: eventsData
        });
        // at this point we have all the data we need
        // now we need to put it into the proper format
        
        this.formatData();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  formatData = () => {
    console.log("in format data")
 // Needs to be in this format
 //     id: 0,
 //     title: 'All Day Event very long title',
 //     allDay: true,                           // optional
 //     start: new Date(2015, 3, 0),
 //     end: new Date(2015, 3, 1),
 //     desc: 'blah blah'                     // optional    
    let events = [];

  let eventRec = {
      id: 0,
      title: "test",
      start: "",
      end: "",
      desc: "",
    }

    console.log("eventRec.title: ", eventRec.title)
console.log("past event rec");
    this.state.eventData.forEach((item, index) => {
      console.log("item: ", item);
      eventRec.id =  eventRec.id + 1
      eventRec.title = item.eventName
        eventRec.start = item.startDate
        eventRec.end = item.endDate
        eventRec.desc = item.description
        console.log("this.eventRec: ", eventRec)
        events.push(eventRec)
        
    })
console.log("events: ", events)

  }



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