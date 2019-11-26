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
import "../../StyledComponents/Dashboards/AddUsers/AddUsers.css";

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
      vacationsId: "",
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

  changeHandler = event => {
    // handle inputs
    console.log("in the changeHandler: ", event)
  }

  addUser = () => {
    // add users info to the users list
    let usersList = this.state.usersList;
    let userRec = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        vacationsId: this.props.vacationsId,
    }
    usersList.push(userRec);

    this.setState({
        usersList: usersList
      }); 
    
  }

  invite = () => {
    // save the users list to the db
    // send emails to all the users on list
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
                                className="firstName"
                                value={this.state.firstName}
                                onChange={this.changeHandler}
                                /* onChange={event => this.changeHandler(event)} */
                                inputProps={{ placeholder: "First Name" }}
                                formControlProps={{ fullWidth: true }}
                            />
                            <CustomInput
                                id="regular"
                                className="lastName"
                                onChange={() => this.changeHandler()}
                                inputProps={{ placeholder: "Last Name" }}
                                formControlProps={{ fullWidth: true }}
                            />
                            <CustomInput
                                id="regular"
                                className="email"
                                onChange={() => this.changeHandler()}
                                inputProps={{ placeholder: "Email" }}
                                formControlProps={{ fullWidth: true }}
                            /> <p> </p>
                           <Button  
                                onClick={() => this.addUser()} 
                                color="rose">Add User to List
                            </Button>
                           
                            <div className="users-list">

                            </div>
                            <p> </p>
                            <h2>Press the invite button to send emails to the people on your list.</h2>
                            <p> </p>
                            <Button  
                                onClick={() => this.invite()} 
                                color="rose">Invite
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
      </GridContainer>
    );
  }
}

export default AddUsers;