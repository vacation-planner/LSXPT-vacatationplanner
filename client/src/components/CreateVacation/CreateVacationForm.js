import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    padding: 0,
    fontSize: '2.0rem'
  },
  button: {
    width: '100%',
    backgroundColor: '#E91E63',
    margin: 0,
    color: 'white',
    height: '40px',
    fontSize: '1.5rem'
    // '&:hover': {
    //   color: '#333',
    //   boxShadow: '1px 1px 2px #1565c0'
    // }
  },
  dialogContextText: {
    fontSize: '2.0rem'
  },
  title: {
    fontSize: '2.5rem'
  }
};

class CreateVacationForm extends React.Component {
  state = {
    open: false,
    vacationName: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, vacationName: '' });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    const { classes, vacationType } = this.props;
    const price =
      vacationType === 'basic' ? 0 : vacationType === 'premium' ? 5 : null;
    return (
      <div className={classes.container}>
        <Button
          className={classes.button}
          onClick={this.handleClickOpen}
          variant='contained'
        >
          {vacationType === 'basic'
            ? `Start for free`
            : `Select for $${price}/mo`}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.title}
        >
          <DialogTitle disableTypography id="form-dialog-title" classes={{root: classes.title}} >Create Vacation</DialogTitle>
          <DialogContent>
            <DialogContentText classes={{root: classes.dialogContextText}}>
            {vacationType === 'basic'
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {this.props.vacationType === 'basic' ? (

            'basic'
            ) : (

            "Pedro's Stripe Button"
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CreateVacationForm);
