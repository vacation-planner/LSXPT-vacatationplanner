import React from "react";
//import { render } from "react-dom";
import AddUsers from "../AddUsers/addUsers.js";
import Dnd from "./dragDrop.js";
import Display from "../Vacations/display.js";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "../../StyledComponents/Dashboards/Calendar/js/Button.js";
import Card from "../../StyledComponents/Dashboards/Calendar/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Calendar/js/CardBody.js";

import styles from "../../StyledComponents/Dashboards/Calendar/js/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

const useStyles = makeStyles(styles);

//const URL = "http://localhost:5500/api";
const URL = 'https://vacationplannerlx.herokuapp.com/api';

  class Calendar extends React.Component {
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
     
      events.push({
        //id: item.id,
        title: item.title,
        start: item.startDate,
        end: item.endDate,
        desc: item.location,
        resourceId: 1,
      })  
    })
    
    this.state.eventData.forEach((item, index) => {
     
      events.push({
        //id: item.id,
        title: item.eventName,
        start: item.startTimeDate,
        end: item.endTimeDate,
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
    <Card style={{ marginLeft: "20px", width: "10%", top: "0px", }}>
    <CardBody>
      <Dnd  events={this.state.events} >
      </Dnd>
      </CardBody>
    </Card>
    {/* <Card style={{marginLeft: "30px", width: "30%", top: "0px", }}>
    <CardBody>
      </CardBody>
    </Card> */}
    <AddUsers>
      </AddUsers>
      <Display>
        </Display>

    
  </div>
  );
}
}
export default Calendar;