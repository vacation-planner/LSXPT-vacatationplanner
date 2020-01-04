import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Button from "../../StyledComponents/Dashboards/AddUsers/js/Button.js";
import Card from "../../StyledComponents/Dashboards/AddUsers/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/AddUsers/js/CardBody.js";
import GridContainer from "../../StyledComponents/Dashboards/AddUsers/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/AddUsers/js/GridItem.js";
import { Row,  
        UsersContainer,  
    } from "../../StyledComponents/Dashboards/AddUsers/addUsers.js";
import styles from "../../StyledComponents/Dashboards/AddUsers/js/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles, Zoom } from "@material-ui/core";
import "../../StyledComponents/Dashboards/AddUsers/AddUsers.css";

const useStyles = makeStyles(styles);

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
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
            vacationsId: this.props.vacationsId,        
            vacationsTitle: this.props.title,
            checked: false,
        };
  }

  componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));
    let uid = fire.currentUser.uid;
     this.setState({
      uid: uid
    }); 
    // check for any current secondary users
    this.displayUsers();
  }

  changeHandler = event => {
    // handle inputs
    this.setState({
        [event.target.name]: event.target.value
      });
  }

    displayUsers = () => {
    const usersList = [];
    axios
      .get(`${URL}/secondaryUsers/`) // Get User Data
      .then(response => {
        response.data.forEach(result => {
          if (result.vacationsId === this.state.vacationsId) {
            usersList.push(result);
          } 
        })
        this.setState({
            usersList: usersList, 
          });  
      })
      .catch(err => {
        console.log("There was an error accessing secondary users table", err);
      });
  };

  addUser = () => {
     // Need to do some validation here!

    // check the firstName, lastName and email fields for valid data.

    if (this.state.firstName && this.state.lastName && this.state.email) {
    // add users info to the users list
    let usersList = this.state.usersList;
    // create a record using the input
    let userRec = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        vacationsId: this.state.vacationsId,
    }
    usersList.push(userRec);
    
    axios
        .post(`${URL}/secondaryUsers/`, userRec)
        .then(response => {
            console.log("file written")
        })
        .catch(err => {
            console.log('We"ve encountered an error');
        });
    // clear the inputs
    this.setState({
        usersList: usersList, 
        firstName: "", 
        lastName: "",
        email: "",   
      }); 
    
  } else {
    alert("Empty or missing fields, please check...")
  }
}

  removeUser = () => {
    // add the code here to remove user from list
    alert("Not coded yet, sorry.")
  }

  invite = () => {
   
   

   
    // send emails to all the users on list
    const userList = this.state.usersList;
    // send the user list via post to the email router
    axios
      .post(`${URL}/emails/`, userList) 
      .then(response => {
        console.log("emails sent") 
      })
      .catch(err => {
        console.log("There was an error sending emails", err);
      });
}

  render() {
   /*  if (this.state.usersList.length) {
        // returns loading sign while data is being retrieved from API
        return <Loading>Loading Users...</Loading>;
      } */
      const { checked } = this.state;
      let rows = [];
      // **************************************
      // NOTE: need to correct the formatting
      // *************************************
      this.state.usersList.forEach((user, index) => {
        // Loops through array of secondary users and lists them in a div
        rows.push(
            <UsersContainer key={index}>
                {user.firstName}, {user.lastName}, {user.email}      
            </UsersContainer>
            );
        });
    return (
        <Zoom in={checked}>
        <GridContainer>
            <GridItem>
                 <Card style={{ width: "600px", height: "420px", marginLeft: "40px", marginTop: "10px"}}>
                    <CardBody>
                        <form className="addUsers" onSubmit={this.onSubmit}>
                            <h4>Add Participants to Vacation: {this.state.vacationsTitle}</h4>
                            <Row>
                               First Name:
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={this.changeHandler}
                                    value={this.state.firstName}
                                    className="firstName"
                                />
                            </Row>                          
                            <Row>
                                Last Name:
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={this.changeHandler}
                                    value={this.state.lastName}
                                    className="lastName"
                                />
                            </Row>
                            <Row>
                            Email:
                            <input
                                type="text"
                                name="email"
                                onChange={this.changeHandler}
                                value={this.state.email}
                                className="email"
                            />
                            </Row>                          
                           <Button  
                                onClick={() => this.addUser()} 
                                color="rose">Add
                            </Button>
                            <Button  
                                onClick={() => this.removeUser()} 
                                color="rose"
                                disabled="true">Remove
                            </Button>                                                    
                            <div className="users-list">
                                {rows}
                            </div> 
                            <h5>Press the invite button to send emails to the people on your list.</h5>
                            {/* <p> </p> */}
                            <Button  
                                onClick={() => this.invite()} 
                                color="rose">Send Invites
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
      </GridContainer>
      </Zoom>
    );
  }
}

export default AddUsers;