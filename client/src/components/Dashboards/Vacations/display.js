import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import AddUsers from "../AddUsers/addUsers.js"
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

const URL = "http://localhost:5500/api";

const styles = theme => ({
  cardBody: {
      backgroundColor: "#E91E63",
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
           <Card style={{ width: "1200px", height: "600px", }}>
               <CardBody className={classes.cardBody}>
            Current Vacation Name:
                <CustomInput
                    id="regular"
                    inputProps={{ placeholder: "Vacation" }}
                    formControlProps={{ fullWidth: false }}
                />
                </CardBody>
                <CardBody>
           <AddUsers>
             </AddUsers>
                </CardBody>
                <CardBody   className={classes.cardBody} xs={12} sm={12} md={4}>
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

export default withStyles(styles)(Vacations);
//export default Vacations;