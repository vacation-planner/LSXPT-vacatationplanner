import React from 'react';
import axios from 'axios';
import Button from '../Material-UI/components/CustomButtons/Button.jsx';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppContext } from '../Context/AppContext';
import Navbar from '../Dashboards/Navbar';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        fontSize: '2.0rem',
        [theme.breakpoints.up(400 + theme.spacing(2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#E91E63'
    },
    input: {
        fontSize: '1.5rem',
        [theme.breakpoints.up(400)]: {
            fontSize: '2.0rem'
        }
    },
    inputLabel: {
        fontSize: '1.25rem'
    },
    message: {
        color: 'red',
        marginTop: theme.spacing(1)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        fontSize: '2.0rem',
    },
    submit: {
        marginTop: theme.spacing(3),
        fontSize: '1.5rem'
    },
    typography: {
        fontSize: '2.5rem'
    }
});

class SignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        signedIn: false,
        message: '',
        focus: 1,
        error: 0
    };

    InputHandler = event => {
        event.preventDefault();
        const target = event.target;
        console.log(event.target.value);
        this.setState({
            [target.name]: target.value,
            error: 0,
            message: ''
        });
    };

    SubmitHandler = event => {
        event.preventDefault();

        const { firstName, lastName, email, confirmEmail, password, confirmPassword } = this.state;

        if(!firstName && !lastName && !email && !confirmEmail && !password && !confirmPassword) {
            this.setState({
                message: 'Plese fill out all the fields',
                focus: 1,
                error: 1
            })
        }

        else if (!firstName) {
            this.setState({
                message: 'First name cannot be empty',
                focus: 1,
                error: 1
            })
        }

        else if (!lastName) {
            this.setState({
                message: 'Last name cannot be empty',
                focus: 2,
                error: 2
            })
        }
        else if (!email) {
            this.setState({
                message: 'Email cannot be empty',
                focus: 3,
                error: 3
            });
        } 
        else if (!confirmEmail) {
            this.setState({
                message: 'Confirm email cannot be empty',
                focus: 4,
                error: 4
            })
        }
        else if (!password) {
            this.setState({
                message: 'Password cannot be empty',
                focus: 5,
                error: 5
            });
        }
        else if (!confirmPassword) {
            this.setState({
                message: 'Confirm password cannot be empty',
                focus: 6,
                error: 6
            });
        }
        else if (email !== confirmEmail) {
            this.setState({
                message: 'Your two emails do not match',
                focus: 3,
                error: 3
            })
        }
        else if (password !== confirmPassword) {
            this.setState({
                message: 'Your two passwords do not match',
                focus: 5,
                error: 5
            })
        }
        else {
            // Send Axios call
            
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <Navbar />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography className={classes.typography}>
                        Sign Up
                    </Typography>
                    <p className={classes.message}>{this.state.message}</p>
                    <form
                        className={classes.form}
                        onSubmit={this.SubmitHandler}
                    >
                        <FormControl
                            margin="normal"
                            fullWidth
                            error={this.state.error === 1 ? true : false}
                        >
                            <InputLabel htmlFor="firstName" className={classes.inputLabel}>
                                First Name
                            </InputLabel>
                            <Input
                                id="firstName"
                                name="firstName"
                                onChange={this.InputHandler}
                                autoComplete="firstName"
                                autoFocus
                                className={classes.input}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            error={this.state.error === 2 ? true : false}
                        >
                            <InputLabel htmlFor="lastName" className={classes.inputLabel}>
                                Last Name
                            </InputLabel>
                            <Input
                                id="lastName"
                                name="lastName"
                                onChange={this.InputHandler}
                                autoComplete="lastName"
                                className={classes.input}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            error={this.state.error === 3 ? true : false}
                        >
                            <InputLabel htmlFor="email" className={classes.inputLabel}>
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                onChange={this.InputHandler}
                                autoComplete="email"
                                className={classes.input}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            error={this.state.error === 4 ? true : false}
                        >
                            <InputLabel htmlFor="confirmEmail" className={classes.inputLabel}>
                                Confirm Email Address
                            </InputLabel>
                            <Input
                                id="confirmEmail"
                                name="confirmEmail"
                                onChange={this.InputHandler}
                                autoComplete="confirmEmail"
                                className={classes.input}
                            />
                        </FormControl>
                        
                        <FormControl
                            margin="normal"
                            fullWidth
                            error={this.state.error === 5 ? true : false}
                        >
                            <InputLabel htmlFor="password" className={classes.inputLabel}>Password</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                onChange={this.InputHandler}
                                type="password"
                                className={classes.input}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            error={this.state.error === 6 ? true : false}
                        >
                            <InputLabel htmlFor="confirmPassword" className={classes.inputLabel}>Confirm Password</InputLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={this.InputHandler}
                                type="confirmPassword"
                                className={classes.input}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            color="rose"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignUp.contextType = AppContext;

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
