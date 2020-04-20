import React from "react";
//import AddUsers from "../AddUsers/addUsers.js";
import Dnd from "./dragDrop.js";
//import Display from "../Vacations/display.js";
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

  class Calendar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        uid: "",
        vacationsId: this.props.vacationsId,    //this.props.id,
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
      .get(`/vacations/${id}`)
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
      .get('/events/')
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
    <Card style={{ marginLeft: "20px", width: "540px", top: "0px", }}>
    <CardBody>
      <Dnd  events={this.state.events} >
      </Dnd>
      </CardBody>
    </Card>
    {/* <Card style={{marginLeft: "30px", width: "30%", top: "0px", }}>
    <CardBody>
      </CardBody>
    </Card> */}
  {/*   <AddUsers>
      </AddUsers> */}
      {/* <Display>
        </Display> */}

    
  </div>
  );
}
}
export default Calendar;