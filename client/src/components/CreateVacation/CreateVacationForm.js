import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { AppContext } from "../Context/AppContext.js";
import { Link } from "react-router-dom";
import Checkout from "../Checkout/Checkout";

const styles = theme => ({
  button: {
    width: "100%",
    backgroundColor: "#E91E63",
    margin: 0,
    color: "white",
    height: "40px",
    fontSize: "1.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: "#AA1649"
    }
  },
  buttonsDiv: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  cancelButton: {
    width: "100%",
    maxWidth: 150,
    margin: 0,
    color: "black",
    height: "40px",
    fontSize: "1.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: "#AA1649"
    }
  },
  container: {
    width: "90%",
    margin: "0 auto",
    padding: 0,
    fontSize: "2.0rem"
  },
  createVacationButton: {
    width: "100%",
    maxWidth: 175,
    margin: 0,
    color: "white",
    backgroundColor: "#E91E63",
    height: "40px",
    fontSize: "1.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: "#AA1649"
    }
  },
  dialogStyle: {
    margin: 0
  },
  dialogContextText: {
    fontSize: "2.0rem"
  },
  dialogTitle: {
    fontSize: "2.5rem"
  },

  textField: {
    fontSize: "2.5rem"
  },
  textFieldLabel: {
    fontSize: "2.0rem"
  }
});

class CreateVacationForm extends React.Component {
  state = {
    open: false,
    vacationName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  onToken = token => {
    fetch("localhost:5500/api/stripe", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  // addVacationToContext = () => {
  //     let newVacationName = this.state.vacationName;
  //     console.log(newVacationName)
  //     this.context.setTempVacationName(newVacationName)
  // }

  render() {
    const { classes, vacationType } = this.props;
    const price =
      vacationType === "basic" ? 0 : vacationType === "premium" ? 5 : null;
    return (
      <div className={classes.container}>
        <Button
          className={classes.button}
          onClick={this.handleClickOpen}
          variant="contained"
        >
          {vacationType === "basic"
            ? `Start for free`
            : `Select for $${price}/mo`}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          classes={{ paper: classes.dialogStyle }}
        >
          <DialogTitle
            disableTypography
            id="form-dialog-title"
            classes={{ root: classes.dialogTitle }}
          >
            Create Vacation
          </DialogTitle>
          <DialogContent classes={{ root: classes.dialogTitle }}>
            <DialogContentText classes={{ root: classes.dialogContextText }}>
              {vacationType === "basic"
                ? `Please enter the name of the vacation. Then click "Create
                                    Vacation" to begin creating your vacation.`
                : `Please enter the name of the vacation. Then click "Create
                                    Vacation" to enter your billing information.`}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="vacationName"
              value={this.state.vacationName}
              onChange={this.handleChange}
              label="Vacation Name"
              type="text"
              fullWidth
              InputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textFieldLabel
              }}
            />
          </DialogContent>
          <DialogActions>
            <div className={classes.buttonsDiv}>
              <Button
                className={classes.cancelButton}
                onClick={this.handleClose}
                color="secondary"
              >
                Cancel
              </Button>
              {this.props.vacationType === "basic" ? (
                <Link
                  to={{
                    pathname: `/createVacationDetails`,
                    state: { title: this.state.vacationName }
                  }}
                  className={classes.linkStyling}
                >
                  <Button
                    className={classes.createVacationButton}
                    // onClick={this.addVacationToContext}
                    variant="contained"
                    // href='/createVacationDetails'
                  >
                    Create Vacation
                  </Button>
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/premium`,
                    state: { title: this.state.vacationName }
                  }}
                  className={classes.linkStyling}
                >
                  <Button
                    className={classes.createVacationButton}
                    // onClick={this.addVacationToContext}
                    variant="contained"
                    // href='/createVacationDetails'
                  >
                    Go to Payment
                  </Button>
                </Link>
              )}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CreateVacationForm.contextType = AppContext;

export default withStyles(styles)(CreateVacationForm);
