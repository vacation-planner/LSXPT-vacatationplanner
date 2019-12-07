import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Button from "../../StyledComponents/Dashboards/AddUsers/js/Button.js";
import Card from "../../StyledComponents/Dashboards/AddUsers/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/AddUsers/js/CardBody.js";
//import CustomInput from "../../StyledComponents/Dashboards/AddUsers/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/AddUsers/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/AddUsers/js/GridItem.js";
import { Row, 
        //CardBlock, 
        UsersContainer, 
        //Loading 
    } from "../../StyledComponents/Dashboards/AddUsers/addUsers.js";
import styles from "../../StyledComponents/Dashboards/AddUsers/js/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";
import "../../StyledComponents/Dashboards/AddUsers/AddUsers.css";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";

// this component needs the vacationsId passed down to it
// the vacation title would be helpful, if it is unavailable
// i can just grab it from the table.

// they are hard coded right now for testing

class AddUsers extends Component {
    constructor(props) {
      super(props);
        this.state = {
            firstName: "",
            lastName: "",
            usersList: [],
            uid: "",
            email: "",
//          vacationsId: this.props.id,
            vacationsId: 1,         
//          vacationsTitle: this.props.title,
            vacationsTitle: "Winter",
        };
  }

  componentDidMount() {
  // i dont think i need this...
    let uid = fire.currentUser.uid;
     this.setState({
      uid: uid
    }); 
    console.log("state: ", this.state)
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
    
  }

  removeUser = () => {
    // add the code here to remove user from list
    alert("Not coded yet, sorry.")
  }

  invite = () => {
    // send emails to all the users on list
    let userList = this.state.usersList;
   /*  this.state.usersList.forEach((user, index) => {
      userList.push(user.email)  
    }); */
    
    // now goto email component
    axios
      .post(`${URL}/emails/`, userList) // Get User Data
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
        <GridContainer>
            <GridItem>
                 <Card>
                    <CardBody>
                        <form className="addUsers" onSubmit={this.onSubmit}>
                            <h1>Add Users to Vacation: {this.state.vacationsTitle}</h1>
                            <Row>
                               <p> First Name:
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={this.changeHandler}
                                    value={this.state.firstName}
                                    className="firstName"
                                /></p>
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
                                color="rose">Add User to List
                            </Button>
                            <Button  
                                onClick={() => this.removeUser()} 
                                color="rose">Remove User
                            </Button>                                                    
                            <div className="users-list">
                                {rows}
                            </div>
                            <p> </p>
                            <h2>Press the invite button to send emails to the people on your list.</h2>
                            <p> </p>
                            <Button  
                                onClick={() => this.invite()} 
                                color="rose">Send Invites
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