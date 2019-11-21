import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";

import CustomInput from "../../StyledComponents/Dashboards/Details/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Details/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Details/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Details/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Details/CardBody.js";
//import CustomInput from '../../StyledComponents/Dashboards/Details/CustomInput.jsx';
import styles from "../../StyledComponents/Dashboards/Details/cardImagesStyles.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";

  
class Details extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
   
    return (
      <div className="details">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           <Card style={{ width: "600px", height: "80%" }}>
               <CardBody>
            Enter new Vacation Name:
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

export default Details;