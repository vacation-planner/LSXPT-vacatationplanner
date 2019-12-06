import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Display from "./display.js";
import AddVacations from "./addVacations.js";

import CustomInput from "../../StyledComponents/Dashboards/Vacations/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Vacations/js/CardHeader.js"
import styles from "../../StyledComponents/Dashboards/Vacations/js/cardImagesStyles.js";
import "../../StyledComponents/Dashboards/Vacations/vacations.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";

  
class Vacations extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
   
    return (
      <div className="vacations">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <div className="main">
                    <div className="top">
                        <Display>
                        </Display>
                    </div>
                    <div className="bottom">
                        <AddVacations>
                        </AddVacations>
                    </div>
                </div>
            </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Vacations;