import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AppContext } from "../../Context/AppContext.js";
import Button from "@material-ui/core/Button";
import CloseVacationModal from '../../CloseVacation/closeVacationModal.js';

const styles = theme => ({
  buttonStyling: {
    fontSize: "1.75rem",
    width: "100%",
    textTransform: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    lineHeight: 1.5,
    display: "flex",
    justifyContent: "flex-start",
    padding: "8px 16px"
  },
  nameDiv: {
    margin: "0px",
    textAlign: "center",
    padding: "15px",
    color: "white",
    backgroundColor: "black",
    fontSize: "1.75rem"
  },
  list: {
    padding: 0,
    margin: 0,
    border: 0
  },
  listItemText: {
    fontSize: "1.75rem"
  }
});

class PastVacationDrawer extends React.Component {
  state = {
    vacationDetails: true,
    addParticipants: false,
    calendar: false,
    events: false,
    expenses: false,
    overview: false,
    pastVacation: this.props.pastVacation,
    redirect: false
  };

  displayPastVacation = event => {
    event.preventDefault();
    this.setState({
      vacationDetails: false,
      addParticipants: false,
      calendar: false,
      events: false,
      expenses: false,
      overview: false,
      shouldIClose: false,
    });
    this.setState({
      [event.currentTarget.id]: true
    });
    this.props.displayPastVacationContent(event);
  };

  makePremium = () => {
    this.context.setId(this.state.pastVacation.id);
  };

  flipShouldIClose = event => {
    event.preventDefault();
    this.setState({
      shouldIClose: true,
    })
  }

  closeModal = event => {
    event.preventDefault();
    this.setState({
      shouldIClose: false
    })
  }

  render() {
    const { classes } = this.props;
    const selectedDrawer = {
      backgroundColor: "white"
    };
    
    if (this.state.pastVacation.closed === 1) {
      const ListPastVacations = [
        { name: "vacationDetails", text: "Vacation Details" },
        { name: "calendar", text: "Calendar" },
        { name: "overview", text: "Overview" }
      ];
      return (
        <>
          <div className={classes.nameDiv}>
            {this.state.pastVacation.title || "test"}
          </div>
          <List className={classes.list}>
            {ListPastVacations.map((pastVacation, index) => {
              const { name } = pastVacation;
              return (
                <React.Fragment key={pastVacation.name}>
                  <ListItem
                    button
                    id={pastVacation.name}
                    onClick={this.displayPastVacation}
                    style={this.state[name] ? selectedDrawer : null}
                  >
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={pastVacation.text}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </>
      );
    }
    else {
      const ListPastVacations = [
        { name: "vacationDetails", text: "Vacation Details" },
        { name: "addParticipants", text: "Add Participants" },
        { name: "calendar", text: "Calendar" },
        { name: "events", text: "Events" },
        { name: "expenses", text: "Expenses" },
        { name: "overview", text: "Overview" }
      ];
      return (
        <>
          <div className={classes.nameDiv}>
            {this.state.pastVacation.title || "test"}
          </div>
          <List className={classes.list}>
            {ListPastVacations.map((pastVacation, index) => {
              const { name } = pastVacation;
              return (
                <React.Fragment key={pastVacation.name}>
                  <ListItem
                    button
                    id={pastVacation.name}
                    onClick={this.displayPastVacation}
                    style={this.state[name] ? selectedDrawer : null}
                  >
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={pastVacation.text}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
            <Button
              className={classes.buttonStyling}
              onClick={this.flipShouldIClose}
            >
              Close Vacation
            </Button>
          </List>
          {this.state.shouldIClose ? <CloseVacationModal close={this.closeModal} vacationsId={this.state.pastVacation.id} /> : null}
        </>
      );
    }
  }
}

PastVacationDrawer.contextType = AppContext;

export default withStyles(styles)(PastVacationDrawer);
