import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
// Components
import DateTimePicker from "./dateTime.js";
// Material Ui Dashboard Pro
import Button from "../../StyledComponents/Dashboards/Vacations/js/Button.js";
import CustomInput from "../../StyledComponents/Dashboards/Vacations/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Vacations/js/CardHeader.js"
// From Material Ui
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import { Zoom, Tooltip, Typography } from "@material-ui/core";


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

class Display extends Component {
  constructor(props) {
    super(props);
  this.state = {
    usersUid: "",
    value: "",
    location: "",
    title: this.props.title,
    startDate: "",
    endDate: "",
    vacationsId: this.props.vacationsId,
    disabled: false,
    checked: false,
   };
};

componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));
      let usersUid = fire.currentUser.uid;
       this.setState({
        usersUid: usersUid
      }); 
      // fetch the vacation details
      this.fetchVacation();
    };

addVacation = () => {
    // create a record using the input
    let vacationRec = {
        title: this.state.title,
        location: this.state.location,
        usersUid: this.state.usersUid,
    }
    // update the record in the db
    axios
    .put(`${URL}/vacations/${this.props.vacationsId}`, vacationRec)
        .then(response => {
            console.log("file written");
        })
        .catch(err => {
            console.log('We"ve encountered an error');
        });  
  }

  fetchVacation = () => {
    // fetch all the vacation details from the db and save to state
    axios
      .get(`${URL}/vacations/${this.props.vacationsId}`)
      .then(response => {
        response.data.forEach((item, index) => {
                 
            this.setState({
                vacationsId: this.props.vacationsId,
                location: item.location,
                startDate: item.startDate,
                endDate: item.endDate,
            });
        })
        //console.log('state: ', this.state);
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  handleStartDate = startDate => {
    console.log('startdate: ', startDate);

  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
  });
    
  };

render() {
  const { classes } = this.props;
  const { checked } = this.state;
    return (
       <div className="vacationDisplay"> 
        <Zoom in={checked} > 
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card style={{ width: "700px", height: "400px", marginLeft: "50px"}}>
                    {/*  <div className="images"> </div> */}
                    <h3>Vacation Details: {this.props.title}</h3>
                        <CardBody   className={classes.cardBody2}>
                            <CardBody>
                                <h5>Name of Vacation:{" "}
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={this.handleChange}
                                        value={this.props.title}
                                        className="title"
                                        placeholder={this.props.title}
                                    />
                                </h5>
                            </CardBody>
                            <CardBody> 
                                <h5>Destination:{" "}
                                    <input
                                        type="text"
                                        name="location"
                                        onChange={this.handleChange}
                                        value={this.state.location}
                                        className="location"
                                        placeholder={this.state.location}
                                    />  
                                </h5>
                            </CardBody>
                        </CardBody>
                        <CardBody  xs={12} sm={12} md={4}>
                           
                            <DateTimePicker 
                                title={this.state.title} 
                                location={this.state.location} 
                                vacationsId={this.state.vacationsId} 
                                disabled={this.state.disabled}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                //startDate={() => this.handleStartDate(this.state.startDate)}
                            >
                            </DateTimePicker>  
                       
                        </CardBody>
                        <CardBody  className={classes.cardBody}>
                            <Tooltip
                                placement="top"
                                disableFocusListener
                                title={
                                    <Typography color="inherit" variant="h6">
                                        Click here if any changes have been made
                                    </Typography>
                                }
                            >    
                                <Button  
                                    onClick={() => this.addVacation()} 
                                    color="rose">Update
                                </Button>
                            </Tooltip>
                            <Tooltip
                                placement="top"
                                disableFocusListener
                                title={
                                    <Typography color="inherit" variant="h6">
                                        Function has not been coded yet
                                    </Typography>
                                }
                            >    
                                <Button  
                                    onClick={() => this.removeUser()} 
                                    color="rose"
                                    >Remove
                                </Button> 
                            </Tooltip>                               
                        </CardBody>   
                    </Card>
            </GridItem>
        </GridContainer>
        </Zoom>
       </div> 
    );
  }
}

export default withStyles(styles)(Display);
//export default Vacations;