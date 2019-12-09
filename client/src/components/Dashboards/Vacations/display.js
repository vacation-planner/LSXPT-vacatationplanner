import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import AddUsers from "../AddUsers/addUsers.js"
import DateTimePicker from "./dateTime.js";
import Button from "../../StyledComponents/Dashboards/Vacations/js/Button.js";
import CustomInput from "../../StyledComponents/Dashboards/Vacations/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Vacations/js/CardHeader.js"
//import styles from "../../StyledComponents/Dashboards/Vacations/js/cardImagesStyles.js";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";

//const useStyles = makeStyles(styles);
const URL = 'https://vacationplannerlx.herokuapp.com/api';
//const URL = "http://localhost:5500/api";

const styles = theme => ({
  cardBody: {
      /* backgroundColor: "#E91E63",  */
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
    title: "",
    startDate: "",
    endDate: "",
   };
};

componentDidMount() {
      let usersUid = fire.currentUser.uid;
       this.setState({
        usersUid: usersUid
      }); 
      console.log("state: ", this.state)
    };

addVacation = () => {
    // create a record using the input
    console.log("in the add")
    let vacationRec = {
        title: this.state.title,
        location: this.state.location,
        /* startDate: this.state.startDate, */
      /*   endDate: this.state.endDate, */
        usersUid: this.state.usersUid,
    }
    console.log("in the vacationRec: ", vacationRec)
    axios
        .post(`${URL}/vacations/`, vacationRec)
        .then(response => {
            console.log("file written")
        })
        .catch(err => {
            console.log('We"ve encountered an error');
        });
    // clear the inputs
    /* this.setState({
        usersList: usersList, 
        firstName: "", 
        lastName: "",
        email: "",   
      });  */
    
  }

  handleChange = event => {
   let temp = event.target.value;
   console.log("temp: ", temp)
   this.setState({
    [event.target.name]: event.target.value
  });
    
  };

render() {
  const { classes } = this.props;
    return (
       <div className="vacation"> 
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           <Card style={{ width: "800px", height: "400px", marginLeft: "40px", marginTop: "340px"}}>
          {/*  <div className="images"> </div> */}
           Current Vacation Name: Winter Vacation
               <CardBody   className={classes.cardBody2}>
           
            <CardBody>
            <h5>Name of New Vacation:{" "}
            <input
                type="text"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
                className="title"
            />
               </h5>
                </CardBody>
                <CardBody> <h5>
            Destination:{" "}
            <input
                type="text"
                name="location"
                onChange={this.handleChange}
                value={this.state.location}
                className="location"
            />  </h5>
                </CardBody>
                </CardBody>
                <CardBody  className={classes.cardBody}>
                    <Button  
                        onClick={() => this.addVacation()} 
                        color="rose">Add
                    </Button>
                    <Button  
                        onClick={() => this.removeUser()} 
                        color="rose">Remove
                    </Button>                               
             {/*  <AddUsers>
             </AddUsers>   */}
                </CardBody>
                <CardBody  xs={12} sm={12} md={4}>
                 <DateTimePicker>
               </DateTimePicker>  
                </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
       </div> 
    );
  }
}

export default withStyles(styles)(Display);
//export default Vacations;