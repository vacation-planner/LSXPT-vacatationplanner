import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import DelayLink from 'react-delay-link';
import { AppContext } from "../../Context/AppContext.js";

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

class CurrentVacationDrawer extends React.Component {
  state = {
    vacationDetails: true,
    addParticipants: false,
    calendar: false,
    events: false,
    expenses: false,
    overview: false,
    mobileOpen: false,
    currentVacation: this.props.currentVacation,
    redirect: false
  };

  handleClose = () => {
    this.setState({
      mobileOpen: false
    });
  };

  displayCurrentVacation = event => {
    event.preventDefault();
    this.setState({
      vacationDetails: false,
      addParticipants: false,
      calendar: false,
      events: false,
      expenses: false,
      overview: false
    });
    this.setState({
      [event.currentTarget.id]: true
    });
    this.props.displayCurrentVacationContent(event);
  };

  makePremium = () => {
    this.context.setId(this.state.currentVacation.id);
  };

  render() {
    const { classes } = this.props;
    const selectedDrawer = {
      backgroundColor: "white"
    };
    const ListCurrentVacations = [
      { name: "vacationDetails", text: "Vacation Details" },
      { name: "addParticipants", text: "Add Participants" },
      { name: "calendar", text: "Calendar" },
      { name: "events", text: "Events" },
      { name: "expenses", text: "Expenses" },
      { name: "overview", text: "Overview" }
    ];

    if (
      this.state.currentVacation.premium === 0 ||
      this.state.currentVacation.premium === false
    ) {
      return (
        <>
          <div className={classes.nameDiv}>
            {this.state.currentVacation.title || "test"}
          </div>
          <List onClick={this.handleClose} className={classes.list}>
            {ListCurrentVacations.map((currentVacation, index) => {
              const { name } = currentVacation;
              return (
                <React.Fragment key={currentVacation.name}>
                  <ListItem
                    button
                    id={currentVacation.name}
                    onClick={this.displayCurrentVacation}
                    style={this.state[name] ? selectedDrawer : null}
                  >
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={currentVacation.text}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
            <Button
              className={classes.buttonStyling}
              onClick={() => this.makePremium()}
            >
              <DelayLink
                delay={1500}
                to={{
                  pathname: `/premium`,
                  state: {
                    currentVacationTitle: this.state.currentVacation.title,
                    title: this.state.currentVacation.title,
                    id: this.context.currentVacationId
                  }
                }}
                className={classes.linkStyling}
              >
                Upgrade to Premium
              </DelayLink>
            </Button>
          </List>
        </>
      );
    } else {
      return (
        <>
          <div className={classes.nameDiv}>
            {this.state.currentVacation.title || "test"}
          </div>
          <List onClick={this.handleClose} className={classes.list}>
            {ListCurrentVacations.map((currentVacation, index) => {
              const { name } = currentVacation;
              return (
                <React.Fragment key={currentVacation.name}>
                  <ListItem
                    button
                    id={currentVacation.name}
                    onClick={this.displayCurrentVacation}
                    style={this.state[name] ? selectedDrawer : null}
                  >
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={currentVacation.text}
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
  }
}

CurrentVacationDrawer.contextType = AppContext;

export default withStyles(styles)(CurrentVacationDrawer);
