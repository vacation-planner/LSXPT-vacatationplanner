import React from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import Language from "@material-ui/icons/Language";
// core components
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Vacations/js/CardHeader.js";
import dashboardStyle from "../../StyledComponents/Dashboards/Vacations/js/dashboardStyle";
import loginPageStyle from "../../StyledComponents/Dashboards/Vacations/js/loginPageStyle";
import "../../StyledComponents/Dashboards/Vacations/vacations.css";

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

//const useStyles = makeStyles(styles);

export default function CardHeaderTypes(props) {
  //const classes = useStyles();
  return (
    <div>
      <GridContainer>
      
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose"><div className="test">
            <GridItem xs={12} sm={12} md={6} style={{ left: "30%",position: "relative", top: "2px" }}>          
           Vacation:Name of vac</GridItem>
           <GridItem xs={12} sm={12} md={6}  style={{ left: "30%",position: "relative", top: "8px" }}> 
         Destination: Cabo San Lucas</GridItem></div>
            </CardHeader>
            <CardBody><p ></p><p>
              Click below to add Participants to your vacation</p> <p> An email will be sent them whick will give them access to your vacation..</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
     
    </div>
  );
}