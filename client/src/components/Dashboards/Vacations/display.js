import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import AddUsers from "../AddUsers/addUsers.js"
import DateTimePicker from "./dateTime.js";
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
      backgroundColor: "#E91E63", 
      height: "10%",
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

class Vacations extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
  const { classes } = this.props;
    return (
       <div className="vacation"> 
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           <Card style={{ width: "800px", height: "600px", marginLeft: "40px", marginTop: "340px"}}>
           Current Vacation Name: Winter Vacation
               <CardBody   className={classes.cardBody2}>
           
            <CardBody>
            <h5>Name of New Vacation:{" "}
                <CustomInput
                    id="regular"
                    inputProps={{ placeholder: "Vacation" }}
                    formControlProps={{ fullWidth: false }}
                /></h5>
                </CardBody>
                <CardBody> <h5>
            Destination:{" "}
                <CustomInput
                    id="regular"
                    inputProps={{ placeholder: "Destination" }}
                    formControlProps={{ fullWidth: false }}
                /> </h5>
                </CardBody>
                </CardBody>
                <CardBody  className={classes.cardBody}>
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

export default withStyles(styles)(Vacations);
//export default Vacations;