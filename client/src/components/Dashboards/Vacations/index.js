import React, { Component } from "react";
import { fire } from "../../Auth/firebaseConfig";
import Display from "./display.js";
//import AddVacations from "./addVacations.js";
//import AddUsers from "../AddUsers/addUsers.js"
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import styles from "../../StyledComponents/Dashboards/Vacations/js/cardImagesStyles.js";
import "../../StyledComponents/Dashboards/Vacations/vacations.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';
  
class Vacations extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
    title: this.props.title,
    vacationsId: this.props.vacationsId,
   };
};


render() {
   
    return (
      <div className="vacations">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
               
            {/*  <AddUsers>  </AddUsers>  */}
              <Display title={this.state.title} vacationsId={this.state.vacationsId}>
              </Display>   
            </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Vacations;