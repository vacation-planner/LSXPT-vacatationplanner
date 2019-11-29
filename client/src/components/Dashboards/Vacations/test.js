import React from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Language from "@material-ui/icons/Language";
// core components
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
import CardHeader from "../../StyledComponents/Dashboards/Vacations/js/CardHeader.js";
import CardIcon from "../../StyledComponents/Dashboards/Vacations/js/CardIcon.js";
import CardText from "../../StyledComponents/Dashboards/Vacations/js/CardText.js";

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

const useStyles = makeStyles(styles);

export default function CardHeaderTypes(props) {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
      
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose">
            <div className="test"><h1 className={classes.cardTitle}>Vacation:</h1>Name of vac
                </div>
              <h4 className={classes.cardTitle}>Destination:</h4>
              <p>Cabo San Lucas</p>
            </CardHeader>
            <CardBody>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Cabo...
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
     
    </div>
  );
}