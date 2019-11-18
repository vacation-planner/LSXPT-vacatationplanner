import React from "react";
import { render } from "react-dom";
import Cal from "./calendar.js";

import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import "react-big-calendar/lib/css/react-big-calendar.css";


const URL = "http://localhost:5500/api";


  class Vacation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        uid: "",
        vacationsId: 1,    //this.props.id,
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
 
        if (response.data) {
            response.data.forEach((event, index) => {
                if (event.vacationsId === id) {
                    eventsData.push(event);
                }
            })
        
        };
        console.log("eventsData: ", eventsData)
        this.setState({
          eventData: eventsData
        });
               
        this.formatData();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  formatData = () => {
 
  //let vacationDate = [];
  let events = [];
  this.state.vacation.forEach((item, index) => {
      let vStart = item.startDate.toString();
      let sD =  vStart.slice(3,5);
      let sM = vStart.slice(0,2);
      let sY =  vStart.slice(-4);
      console.log("sD: ", sD)
      let vEnd = item.endDate.toString();
      let eD =  vEnd.slice(3,5);
      let eM = vEnd.slice(0,2);
      let eY =  vEnd.slice(-4);
 
      events.push({
        //id: item.id,
        title: item.title,
        start: new Date(sY, sM, sD),
        end: new Date(eY, eM, eD),
        desc: item.location,
      })  
    })
    
    this.state.eventData.forEach((item, index) => {
      // extract time from startTime
      let tmpDate = item.startDate.toString();
      let d =  tmpDate.slice(3,5);
      let m = tmpDate.slice(0,2);
      let y =  tmpDate.slice(-4);

      let tmpTime = item.startTime.toString();
      let hrs = 0
      let mins = 0
      
      if (tmpTime.length == 3) {
        hrs = tmpTime.slice(0,1);
        mins =  tmpTime.slice(1,3);
      } else {
        hrs = tmpTime.slice(0,2);
        mins =  tmpTime.slice(2,4);
      }
      
      let tmpEndDate = item.endDate.toString();
      let endD =  tmpEndDate.slice(3,5);
      let endM = tmpEndDate.slice(0,2);
      let endY =  tmpEndDate.slice(-4);

      let tmpEndTime = item.endTime.toString();
      let endHrs = 0
      let endMins = 0
      
      if (tmpTime.length == 3) {
        endHrs = tmpEndTime.slice(0,1);
        endMins =  tmpEndTime.slice(1,3);
      } else {
        endHrs = tmpEndTime.slice(0,2);
        endMins =  tmpEndTime.slice(2,4);
      }
     
      events.push({
        id: item.id,
        title: item.eventName,
        start: new Date(y, m, d, hrs, mins),
        end: new Date(endY, endM, endD, endHrs, endMins),
        desc: item.description
      })  
        
    })
console.log("events: ", events)
this.setState({
  events: events
});

  }



render () {

  return (
  <div className="cal-outer">
      <Cal events={this.state.events}>
          </Cal>

      </div>
  );
}
}
export default Vacation;