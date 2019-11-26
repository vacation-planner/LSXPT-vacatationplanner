import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Button from "../../StyledComponents/Dashboards/AddUsers/js/Button.js";
import Card from "../../StyledComponents/Dashboards/AddUsers/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/AddUsers/js/CardBody.js";
import CustomInput from "../../StyledComponents/Dashboards/AddUsers/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/AddUsers/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/AddUsers/js/GridItem.js";

import styles from "../../StyledComponents/Dashboards/AddUsers/js/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";


class AddUsers extends Component {
    constructor(props) {
      super(props);
    this.state = {
      firstName: "",
      lastName: "",
      usersList: [],
      uid: "",
      email: "",
     };
  }


  componentDidMount() {
    //let id = this.state.vacationsId;
    let uid = fire.currentUser.uid;
     this.setState({
      uid: uid
    }); 
  
    console.log("state: ", this.state)
  }



  render() {
   
    return (
        <GridContainer>
            <GridItem>
                 <Card>
                    <CardBody>
                        <form className="addUsers" onSubmit={this.onSubmit}>
                            <h1>Add Users to Vacation</h1>
                            <p></p>
                            <CustomInput
                                id="regular"
                                inputProps={{ placeholder: "First Name" }}
                                formControlProps={{ fullWidth: true }}
                            />
                            <CustomInput
                                id="regular"
                                inputProps={{ placeholder: "Last Name" }}
                                formControlProps={{ fullWidth: true }}
                            />
                            <CustomInput
                                id="regular"
                                inputProps={{ placeholder: "Email" }}
                                formControlProps={{ fullWidth: true }}
                            /> 
                           <Button>Add User</Button>
                            <div className="users-list">

                            </div>
                            <h2>Press the invite button to send emails to the people on your list.</h2>

                        </form>
                    </CardBody>
                </Card>
            </GridItem>
      </GridContainer>
    );
  }
}

export default AddUsers;