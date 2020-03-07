import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";

import CustomInput from "../../StyledComponents/Dashboards/Expenses/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
import styles from "../../StyledComponents/Dashboards/Expensesjs/cardImagesStyles.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';
  
class Expenses extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
   
    return (
      <div className="expenses">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           <Card style={{ width: "600px", height: "80%" }}>
               <CardBody>
            Enter new Expense Name:
                <CustomInput
                    id="regular"
                    inputProps={{ placeholder: "Expense" }}
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

export default Expenses;