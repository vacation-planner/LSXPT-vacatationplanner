import React, { Component } from "react";
import { AppContext } from '../../Context/AppContext.js';
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Button from "../../StyledComponents/Dashboards/AddUsers/js/Button.js";
import Card from "../../StyledComponents/Dashboards/AddUsers/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/AddUsers/js/CardBody.js";
import GridContainer from "../../StyledComponents/Dashboards/AddUsers/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/AddUsers/js/GridItem.js";
import {
  Row,
  UsersContainer,
} from "../../StyledComponents/Dashboards/AddUsers/addUsers.js";
import { Zoom } from "@material-ui/core";
import "../../StyledComponents/Dashboards/AddUsers/AddUsers.css";
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  button: {
    marginTop: '10px',
    marginBottom: '10px',
    marginRight: '10%',
  },
  container: {
    width: "700px",
    height: 'auto',
    marginLeft: "40px",
    marginTop: 10,
    minHeight: '300px',
    [theme.breakpoints.down(1000)]: {
      width: '90%',
      marginLeft: 25,
      minWidth: 680,
    },
    [theme.breakpoints.down(960)]: {
      width: '95%',
      margin: '0 auto',
      marginTop: 10,
      minWidth: 200,
    },
    [theme.breakpoints.down(800)]: {
      width: '98%',
      margin: '0 auto',
      marginTop: 10,
      minWidth: 200,
    },
    [theme.breakpoints.down(600)]: {
      width: '95%',
      margin: '0 auto',
      marginTop: 10,
      minWidth: 200,
    },
    [theme.breakpoints.down(500)]: {
      width: '97.5%',
      margin: '0 auto',
      marginTop: 10,
      minWidth: 200,
    },
    [theme.breakpoints.down(450)]: {
      width: '100%',
      margin: '0 auto',
      marginTop: 10,
      minWidth: 200,
    },
  },
  container2: {
    width: "100%",
    height: 60,
    backgroundColor: '#E91E63',
  },  
})

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
      disabled: true,
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
      .get('/secondaryUsers/') // Get User Data
      .then(response => {
        if (this.state.vacationsId !== undefined) {
          response.data.forEach(result => {
            if (result.vacationsId === this.state.vacationsId) {
              usersList.push(result);
            }
          });
          this.setState({
            usersList: usersList,
          });
        }
        else {
          response.data.forEach(result => {
            if (result.vacationsId === this.context.state.tempVacationHolder.id) {
              usersList.push(result);
            }
          })
          this.setState({
            usersList: usersList,
          });
        }
      })
      .catch(err => {
        console.log("There was an error accessing secondary users table", err);
      });
  };

  addUser = () => {
    // validate the email address
    let emailError = this.validateEmail(this.state.email);
    // check the firstName, lastName and email fields for valid data.
    if (this.state.firstName && this.state.lastName && this.state.email && !emailError) {
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
      //console.log("userRec: ", userRec)
      axios
        .post('/secondaryUsers/', userRec)
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
  };

  validateEmail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    let emailError = true;
    if (result === true) {
      emailError = false;
    } else {
      alert("Invalid email address");
    }
    return emailError
  }

  secondaryUserSelect = id => {
    console.log("id, You are here", id)
    // modify to send only one user
    const userList = this.state.usersList;
    let secondaryUserRec = [];

    userList.forEach(result => {
      if (result.id === id) {
        secondaryUserRec.push(result);
      }
    })

    if (secondaryUserRec) {
      // send the user list via post to the email router
      axios
        .post('/emails/', secondaryUserRec)
        .then(response => {
          console.log("emails sent")
        })
        .catch(err => {
          console.log("There was an error sending email", err);
        });
    } else {
      alert("Need to add participants")
    }



    this.setState({
      disabled: false
    });
  }

  secondaryUsersList = (props) => {
    // *****************************************************************************
    // try to insert a button for each list item so emails can be sent individually
    // current code will send an email when you click on the secondary user
    // ****************************************************************************
    const secondaryUsers = this.state.usersList.map((secondaryUser) =>
      <li key={secondaryUser.id} className="secondaryUsers" onClick={() => { this.secondaryUserSelect(secondaryUser.id) }}>{secondaryUser.firstName},{secondaryUser.lastName},{secondaryUser.email}</li>
    );
    return (
      <ul className="ul">{secondaryUsers}</ul>
    );
  }
  /* rowHandler = event => {
    
    let participant = event.target.name;
    console.log("participant, You are here", participant)
  } */

  invite = () => {
    // send emails to all the users on list
    const userList = this.state.usersList;
    if (userList) {
      // send the user list via post to the email router
      axios
        .post('/emails/', userList)
        .then(response => {
          console.log("emails sent")
        })
        .catch(err => {
          console.log("There was an error sending emails", err);
        });
    } else {
      alert("Need to add participants")
    }
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
   
    return (
      <div className="addParticipants">
        <UsersContainer>
          <Zoom in={checked}>
            <GridContainer>
              <GridItem>
                <Card className={classes.container}>
                <form className="addUsers" onSubmit={this.onSubmit}>
                  <CardBody>
                   
                      <h4>Add Participants to Vacation: {this.state.vacationsTitle}</h4>
                      <Row>
                        First Name: &nbsp;
                                <input
                          type="text"
                          name="firstName"
                          onChange={this.changeHandler}
                          value={this.state.firstName}
                          className="firstName"
                        />
                      </Row>
                      <Row>
                        Last Name: &nbsp;
                                <input
                          type="text"
                          name="lastName"
                          onChange={this.changeHandler}
                          value={this.state.lastName}
                          className="lastName"
                        />
                      </Row>
                      <Row>
                        Email: &nbsp;
                            <input
                          type="text"
                          name="email"
                          onChange={this.changeHandler}
                          value={this.state.email}
                          className="email"
                        />
                      </Row>
                      <Button
                        className={classes.button}
                        onClick={() => this.addUser()}
                        color="rose">Add
                            </Button>
                      <Button
                        onClick={() => this.removeUser()}
                        color="rose"
                        disabled={this.state.disabled}>Remove
                            </Button>
                      <div className="users-list">
                        {this.secondaryUsersList()}
                      </div>
                      <h5>Select a person from the list to send an email or click the button to send it to everyone.</h5>   
                  </CardBody>
                  <CardBody className={classes.container2}>
                  <Button  
                    onClick={() => this.invite()} 
                    color="rose">Send Invites
                  </Button> 
                    </CardBody>
                    </form>
                </Card>
              </GridItem>
            </GridContainer>
          </Zoom>
        </UsersContainer>
      </div>
    );
  }
}

AddUsers.contextType = AppContext;

export default withStyles(styles)(AddUsers);