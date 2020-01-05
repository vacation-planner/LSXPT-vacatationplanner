import React from "react";
<<<<<<< HEAD
// import { render } from "react-dom";
import Cal from "./calendar.js";

=======
import AddUsers from "../AddUsers/addUsers.js";
import Dnd from "./dragDrop.js";
import Display from "../Vacations/display.js";
>>>>>>> 84b553981bcff936206e753180c38394426f21f3
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Button from "../../StyledComponents/Dashboards/Calendar/js/Button.js";
import Card from "../../StyledComponents/Dashboards/Calendar/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Calendar/js/CardBody.js";
import styles from "../../StyledComponents/Dashboards/Calendar/js/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";
// this is where all the calendar styles come from
import "../../StyledComponents/Dashboards/Calendar/Calendar.css";

// this has a different set of styles for the calendar
//import "react-big-calendar/lib/css/react-big-calendar.css";

// *************************************************************************************/
// **  NOTE: I am using this page as a container to display several other components  **/
// **  they were not meant to be used together so only use the Dnd component          **/
// **  with this page in the final product.                                           **/
// *************************************************************************************/


const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';

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
 
  // you dont need the event data here
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
   // remove this code 
    this.state.eventData.forEach((item, index) => {
<<<<<<< HEAD
      // extract time from startTime
      let tmpDate = item.startDate.toString();
      let d =  tmpDate.slice(3,5);
      let m = tmpDate.slice(0,2);
      let y =  tmpDate.slice(-4);

      let tmpTime = item.startTime.toString();
      let hrs = 0
      let mins = 0
      
      if (tmpTime.length === 3) {
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
      
      if (tmpTime.length === 3) {
        endHrs = tmpEndTime.slice(0,1);
        endMins =  tmpEndTime.slice(1,3);
      } else {
        endHrs = tmpEndTime.slice(0,2);
        endMins =  tmpEndTime.slice(2,4);
      }
=======
>>>>>>> 84b553981bcff936206e753180c38394426f21f3
     
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