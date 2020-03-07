import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";

import CustomInput from "../../StyledComponents/Dashboards/Vacations/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Vacations/js/CardHeader.js"
import dashboardStyle from "../../StyledComponents/Dashboards/Vacations/js/dashboardStyle";
import loginPageStyle from "../../StyledComponents/Dashboards/Vacations/js/loginPageStyle";

import { makeStyles } from "@material-ui/core/styles";

const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';
//const classes = useStyles();

var styles = {
  ...dashboardStyle,
  ...loginPageStyle,
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

class AddVacations extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
  const { classes } = this.props;
 // const { classes } = useStyles();
    return (
      <div className="addVacations">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
           <Card style={{ width: "400px", height: "80%" }}>
           <CardHeader>
             </CardHeader>
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

export default AddVacations;