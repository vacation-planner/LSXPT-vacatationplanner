import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
import Button from "../../StyledComponents/Dashboards/AddUsers/js/Button.js";
import Card from "../../StyledComponents/Dashboards/AddUsers/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/AddUsers/js/CardBody.js";
import CustomInput from "../../StyledComponents/Dashboards/AddUsers/js/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/AddUsers/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/AddUsers/js/GridItem.js";
import { Row, CardBlock } from "../../StyledComponents/Dashboards/AddUsers/addUsers.js";
import styles from "../../StyledComponents/Dashboards/AddUsers/js/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";
import "../../StyledComponents/Dashboards/AddUsers/AddUsers.css";

const useStyles = makeStyles(styles);

const URL = "http://localhost:5500/api";

const handleChange = event => {
    console.log("handleChange: ", event)
    /* setName(event.target.value); */
}

class AddUsers extends Component {
    constructor(props) {
      super(props);
    this.state = {
      firstName: "",
      lastName: "",
      usersList: [],
      uid: "",
      email: "",
      vacationsId: 1,         //this.props.id,
      vacationsTitle: "Winter",      //this.props.title,
     };
  }


  componentDidMount() {
    //let id = this.state.vacationsId;
    // get the vacation title
    let uid = fire.currentUser.uid;
     this.setState({
      uid: uid
    }); 
  
    console.log("state: ", this.state)
  }

  changeHandler = event => {
    // handle inputs
    console.log("in the event.target.value: ", event.target.value)
    this.setState({
        [event.target.name]: event.target.value
      });
  }

  

  addUser = () => {
    // add users info to the users list
    console.log('this.state.firstName: ', this.state.firstName);
    let usersList = this.state.usersList;
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
    this.setState({
        usersList: usersList, 
        firstName: "", 
        lastName: "",
        email: "",   
      }); 
    
  }

  invite = () => {
    // save the users list to the db
    // send emails to all the users on list
    let usersList = this.state.usersList;
    this.writeToDb(usersList);

    // now goto email component

  }

writeToDb = usersList => {
    usersList.forEach((item, index) => {
    const secondaryUserRec = {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        vacationsId: item.vacationsId,
    }
    console.log("secondaryUserRec: ", secondaryUserRec)
  axios
  .post(`${URL}/secondaryUsers/`, secondaryUserRec)
  .then(response => {
    console.log("file written")
   })
  .catch(err => {
    console.log('We"ve encountered an error');
  });
})
}

  render() {
   
    return (
        <GridContainer>
            <GridItem>
                 <Card>
                    <CardBody>
                        <form className="addUsers" onSubmit={this.onSubmit}>
                            <h1>Add Users to Vacation: {this.state.vacationsTitle}</h1>
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
                            <p></p>
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
                           
                            <div className="users-list">
                             {`${this.state.usersList.map((item, index) => {
                                
                             })}`}
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