import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
// Components
import AddEvents from "./addEvents.js"
// Material Ui Dashboard Pro
import Button from "../../StyledComponents/Dashboards/Events/js/Button.js";
import CustomInput from "../../StyledComponents/Dashboards/Events/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Events/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Events/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Events/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Events/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Events/js/CardHeader.js"
// From Material Ui
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";


//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";

const styles = theme => ({
  cardBody: {
       backgroundColor: "#E91E63",  
      /* height: "10%", */
      [theme.breakpoints.up("sm")]: {
          width: "100%",
         
      }
  },
  cardBody2: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.up("sm")]: {
        width: "100%",
       
    }
},
  gridItem: {
      cursor: "pointer",
      padding: 15,
      paddingLeft: 35,
      fontSize: "2rem",
  }
});

class Events extends Component {
  constructor(props) {
    super(props);
  this.state = {
    usersUid: "",
    value: "",
    eventName: "",
    vacation: "",
    vacationsId: 1,
    startTimeDate: "",
    endTimeDate: "",
    description: "",
    eventsId: "",
    disabled: false,
   };
};

componentDidMount() {
      let usersUid = fire.currentUser.uid;
      console.log("we in events: ", this.state.vacationsId)

    this.fetchVacationTitle(this.state.vacationsId);

       this.setState({
        usersUid: usersUid
      }); 
    };

fetchVacationTitle = (vacationsId) => {
    axios
    .get(`${URL}/vacations/${vacationsId}`)
    .then(response => {
      response.data.forEach((item, index) => {
        if (item.id === vacationsId) {          
          this.setState({
              vacation: item.title,
          });
          console.log('vacation found: ', this.state.vacation); 
        }
      });
    })
    .catch(err => {
      console.log('We"ve encountered an error');
    });

}    

addEvent = () => {
    // create a record using the input
    let eventsRec = {
        eventName: this.state.eventName,
        description: this.state.description,
        usersUid: this.state.usersUid,
    }
    console.log("in the eventsRec: ", eventsRec)
    axios
        .post(`${URL}/events/`, eventsRec)
        .then(response => {
            console.log("file written");
            // get the id of the new record
            this.fetchId(this.state.eventName);
        })
        .catch(err => {
            console.log('We"ve encountered an error');
        });  
  }

  fetchId = eventName => {
    axios
      .get(`${URL}/events`)
      .then(response => {
        response.data.forEach((item, index) => {
          if (item.eventName === this.state.eventName) {          
            this.setState({
                eventsId: item.id,
                disabled: false
            });
          }
        });
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  handleStartDate = startDate => {
    console.log('am i doing this right: ', startDate);

  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
  });
    
  };

render() {
  const { classes } = this.props;
    return (
       <div className="events"> 
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card style={{ width: "700px", height: "400px", marginRight: "100px"}}>
                    {/*  <div className="images"> </div> */}
                    <h3>Create Event: {this.state.eventName}</h3>
                    <h4>Current Vacation: {this.state.vacation}</h4>
                        <CardBody   className={classes.cardBody2}>
                            <CardBody>
                                <h5>Name of New Event:{" "}
                                    <input
                                        type="text"
                                        name="eventName"
                                        onChange={this.handleChange}
                                        value={this.state.eventName}
                                        className="eventName"
                                    />
                                </h5>
                            </CardBody>
                            <CardBody> 
                                <h5>Description:{" "}
                                    <input
                                        type="text"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description}
                                        className="description"
                                    />  
                                </h5>
                            </CardBody>
                        </CardBody>
                        <CardBody  xs={12} sm={12} md={4}>
                            <AddEvents 
                                eventName={this.state.eventName} 
                                description={this.state.description} 
                                eventsId={this.state.eventsId} 
                                disabled={this.state.disabled}
                                startTimeDate={() => this.handleStartDate(this.state.startTimeDate)}>
                            </AddEvents>  
                        </CardBody>
                        <CardBody  className={classes.cardBody}>
                            <Button  
                                onClick={() => this.addEvent()} 
                                color="rose">Create
                            </Button>
                            <Button  
                                onClick={() => this.removeEvent()} 
                                color="rose">Remove
                            </Button>                               
                            {/*  <AddUsers>
                            </AddUsers>   */}
                        </CardBody>
                        
                    </Card>
            </GridItem>
        </GridContainer>
       </div> 
    );
  }
}

export default withStyles(styles)(Events);