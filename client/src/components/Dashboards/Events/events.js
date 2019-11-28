import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";

import CustomInput from "../../StyledComponents/Dashboards/Events/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Events/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Events/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Events/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Events/js/CardBody.js";
import styles from "../../StyledComponents/Dashboards/Events/js/cardImagesStyles.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";

  
class Events extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
   
    return (
      <div className="events">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           <Card style={{ width: "600px", height: "80%" }}>
               <CardBody>
            Enter new Event Name:
                <CustomInput
                    id="regular"
                    inputProps={{ placeholder: "Vacation" }}
                    formControlProps={{ fullWidth: true }}
                />
                </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Events;