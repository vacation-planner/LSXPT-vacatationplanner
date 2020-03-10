import React, { Component } from "react";
import { AppContext } from '../../Context/AppContext.js';
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";
// Components
import DateTimePicker from "./dateTime.js";
// Material Ui Dashboard Pro
import Button from "../../StyledComponents/Dashboards/Vacations/js/Button.js";
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Vacations/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Vacations/js/CardBody.js";
// From Material Ui
import withStyles from "@material-ui/core/styles/withStyles";
// import { makeStyles } from "@material-ui/core/styles";
import { Zoom } from "@material-ui/core";
import DeleteModal from './deleteVacationModal.js';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = theme => ({
  actionButtons: {
    [theme.breakpoints.down(1000)]: {
      width: '100%',
      backgroundColor: '#AA1649',
    },
  },
  cardBody: {
    backgroundColor: "#E91E63",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    }
  },
  cardBody2: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    width: '100%',
    [theme.breakpoints.down(1000)]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  cardBodyBottom: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 0,
    paddingTop: 0,
    [theme.breakpoints.down(1000)]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  cardStyling: {
    width: "700px",
    height: 'auto',
    marginLeft: "30px",
    marginTop: 15,
    [theme.breakpoints.down(1000)]: {
      width: '100%',
      marginLeft: 25,
      minWidth: 680,
    },
    [theme.breakpoints.down(960)]: {
      width: '95%',
      margin: '0 auto',
      marginTop: 15,
      minWidth: 200,
    },
    [theme.breakpoints.down(900)]: {
      width: '95%',
      margin: '0 auto',
      marginTop: 15,
      minWidth: 200,
    },
    [theme.breakpoints.down(800)]: {
      width: '98%',
      margin: '0 auto',
      marginTop: 15,
      minWidth: 200,
    },
    [theme.breakpoints.down(600)]: {
      width: '95%',
      margin: '0 auto',
      marginTop: 15,
      minWidth: 200,
    },
    [theme.breakpoints.down(500)]: {
      width: '97.5%',
      margin: '0 auto',
      marginTop: 15,
      minWidth: 200,
    },
    [theme.breakpoints.down(450)]: {
      width: '100%',
      margin: '0 auto',
      marginTop: 15,
      minWidth: 200,
    },
  },
  flexDirectionFlips: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down(1000)]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  inputStyling: {
    height: 22,
    margin: '10px 0px 10px 5px',
    [theme.breakpoints.down(1000)]: {
      margin: 0,
    },
  },
  lockButton: {
    marginRight: 10,
  },
  lockedText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  lockIconsDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  gridItem: {
    cursor: "pointer",
    padding: 15,
    paddingLeft: 35,
    fontSize: "2rem",
  },
});

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersUid: "",
      value: "",
      location: "",
      title: this.props.title,
      startDate: "",
      endDate: "",
      vacationsId: this.props.vacationsId,
      disabled: false,
      checked: false,
      vacationPrimaryUsersUid: "",
      isPrimaryUser: false,
      delete: false,
      locked: false,
      closed: 0,
    };
  };

  componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));
    let usersUid = fire.currentUser.uid;
    this.setState({
      usersUid: usersUid
    });
    this.fetchVacation();
    if (this.state.usersUid === this.state.vacationPrimaryUsersUid) {
      this.setState({
        isPrimaryUser: true
      })
    }
  };

  updateVacation = () => {
    this.context.updateVacation(this.state.vacationsId, this.state.location, this.state.title, this.state.startDate, this.state.endDate, this.state.usersUid, this.state.premium);
    this.context.getVacations();
  }

  fetchVacation = () => {
    if (this.props.vacationsId !== undefined) {
      axios
        .get(`/vacations/${this.props.vacationsId}`)
        .then(response => {
          response.data.forEach((item, index) => {
            this.setState({
              vacationsId: this.props.vacationsId,
              location: item.location,
              startDate: item.startDate,
              endDate: item.endDate,
              premium: item.premium,
              vacationPrimaryUsersUid: item.usersUid,
              closed: item.closed,
            });
          })
          if (this.state.location !== "" && this.state.startDate !== "" && this.state.endDate !== "") {
            this.setState({
              locked: true,
            })
          }
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
    else if (this.context.state.tempVacationHolder.title === this.props.title) {
      axios
        .get(`/vacations/${this.context.state.tempVacationHolder.id}`)
        .then(response => {
          response.data.forEach((item, index) => {
            this.setState({
              vacationsId: this.context.state.tempVacationHolder.id,
              location: item.location,
              startDate: item.startDate,
              endDate: item.endDate,
              premium: item.premium,
              vacationPrimaryUsersUid: item.usersUid,
              closed: item.closed
            });
          })
          if (this.state.location !== "" && this.state.startDate !== "" && this.state.endDate !== "") {
            this.setState({
              locked: true,
            })
          }
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
    }
  };

  handleStartDate = startDate => {
    console.log('startdate: ', startDate);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  flipDelete = event => {
    event.preventDefault();
    this.setState({
      delete: !this.state.delete
    })
  }

  unlockData = event => {
    event.preventDefault();
    this.setState({
      locked: false,
    })
  }

  lockData = event => {
    event.preventDefault();
    this.setState({
      locked: true,
    })
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    if ((this.state.closed === 1) ||(Date.parse(this.state.endDate) < Date.parse(new Date()) + 172800000)) {
      return (
        <div>
          <Zoom in={checked} >
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes.cardStyling}>
                  <h3>Vacation Details:</h3>
                  <CardBody className={classes.cardBody2}>
                    <CardBody className={classes.flexDirectionFlips}>
                      <h5>Name of Vacation:</h5>
                      <h5 className={classes.lockedText}>{this.state.title}</h5>
                    </CardBody >
                    <CardBody className={classes.flexDirectionFlips}>
                      <h5>Destination:</h5>
                      <h5 className={classes.lockedText}>{this.state.location}</h5>
                    </CardBody>
                  </CardBody>
                  <CardBody className={classes.cardBodyBottom}>
                    <CardBody className={classes.flexDirectionFlips}>
                      <h5>Start Date:</h5>
                      <h5 className={classes.lockedText}>{this.state.startDate.substring(5,7)}/{this.state.startDate.substring(8,10)}/{this.state.startDate.substring(0, 4)}</h5>
                    </CardBody>
                    <CardBody className={classes.flexDirectionFlips}>
                      <h5>End Date:</h5>
                      <h5 className={classes.lockedText}>{this.state.endDate.substring(5,7)}/{this.state.endDate.substring(8,10)}/{this.state.endDate.substring(0, 4)}</h5>
                    </CardBody>
                  </CardBody>
                  <CardBody className={classes.cardBody}>
                    <Button
                      onClick={this.flipDelete}
                      color="rose"
                      className={classes.actionButtons}
                      disabled={!this.state.isPrimaryUser}>
                      Remove
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              {this.state.delete ? <DeleteModal close={this.flipDelete} vacationsId={this.state.vacationsId} /> : null}
            </GridContainer>
          </Zoom>
        </div>
      );
    }
    else {
      if (this.state.locked === true) {
        return (
          <div>
            <Zoom in={checked} >
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes.cardStyling}>
                    <div className={classes.lockIconsDiv}>
                      <Button onClick={this.unlockData} className={classes.lockButton} >
                        <LockOpenIcon style={{ width: 40, height: 30 }} />
                      </Button>
                    </div>
                    <h3>Vacation Details:</h3>
                    <CardBody className={classes.cardBody2}>
                      <CardBody className={classes.flexDirectionFlips}>
                        <h5>Name of Vacation:</h5>
                        <h5 className={classes.lockedText}>{this.state.title}</h5>
                      </CardBody >
                      <CardBody className={classes.flexDirectionFlips}>
                        <h5>Destination:</h5>
                        <h5 className={classes.lockedText}>{this.state.location}</h5>
                      </CardBody>
                    </CardBody>
                    <CardBody className={classes.cardBodyBottom}>
                      <CardBody className={classes.flexDirectionFlips}>
                        <h5>Start Date:</h5>
                        <h5 className={classes.lockedText}>{this.state.startDate.substring(5,7)}/{this.state.startDate.substring(8,10)}/{this.state.startDate.substring(0, 4)}</h5>
                      </CardBody>
                      <CardBody className={classes.flexDirectionFlips}>
                        <h5>End Date:</h5>
                        <h5 className={classes.lockedText}>{this.state.endDate.substring(5,7)}/{this.state.endDate.substring(8,10)}/{this.state.endDate.substring(0, 4)}</h5>
                      </CardBody>
                    </CardBody>
                    <CardBody className={classes.cardBody}>
                      <Button
                        onClick={this.flipDelete}
                        color="rose"
                        className={classes.actionButtons}
                        disabled={!this.state.isPrimaryUser}>
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
                {this.state.delete ? <DeleteModal close={this.flipDelete} vacationsId={this.state.vacationsId} /> : null}
              </GridContainer>
            </Zoom>
          </div>
        );
      }
  
      else {
        return (
          <div className="vacationDisplay">
            <Zoom in={checked} >
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes.cardStyling}>
                    <div className={classes.lockIconsDiv}>
                      <Button onClick={this.lockData} className={classes.lockButton} >
                        <LockIcon style={{ width: 40, height: 30 }} />
                      </Button>
                    </div>
                    <h3>Vacation Details:</h3>
                    <CardBody className={classes.cardBody2}>
                      <CardBody className={classes.flexDirectionFlips}>
                        <h5>Name of Vacation:{" "}</h5>
                        <input
                          type="text"
                          name="title"
                          onChange={this.handleChange}
                          value={this.state.title}
                          className={classes.inputStyling}
                          placeholder={this.props.title}
                        />
                      </CardBody >
                      <CardBody className={classes.flexDirectionFlips}>
                        <h5>Destination:{" "}</h5>
                        <input
                          type="text"
                          name="location"
                          onChange={this.handleChange}
                          value={this.state.location}
                          className={classes.inputStyling}
                          placeholder={this.state.location}
                        />
                      </CardBody>
                    </CardBody>
                    <CardBody xs={12} sm={12} md={4}>
                      <DateTimePicker
                        title={this.state.title}
                        location={this.state.location}
                        vacationsId={this.state.vacationsId}
                        disabled={this.state.disabled}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                      >
                      </DateTimePicker>
                    </CardBody>
                    <CardBody className={classes.cardBody}>
                      <Button
                        onClick={() => this.updateVacation()}
                        className={classes.actionButtons}
                        color="rose">Update
                                </Button>
                      <Button
                        onClick={this.flipDelete}
                        color="rose"
                        className={classes.actionButtons}
                        disabled={!this.state.isPrimaryUser}>Remove
                                </Button>
                    </CardBody>
                  </Card>
                </GridItem>
                {this.state.delete ? <DeleteModal close={this.flipDelete} vacationsId={this.state.vacationsId} /> : null}
              </GridContainer>
            </Zoom>
          </div>
        );
      }
    }
  }
}

Display.contextType = AppContext;

export default withStyles(styles)(Display);