import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeNavbar from './Navbar/HomeNavbar.js';
import Vacations from "../Dashboards/Vacations/"
import Events from "../Dashboards/Events/"
import AddUsers from "../Dashboards/AddUsers/addUsers.js"
import { AppContext } from '../Context/AppContext.js';
import CreateVacationForm from '../CreateVacation/CreateVacationForm.js';


const styles = theme => ({
    innerContainer: {
        marginTop: 65,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 65px)',
    },
    main: {
        width: '100%',
        display: 'flex', // Fix IE 11 issue.
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#E2E2E2',
    },
});

class CurrentVacationDashboard extends React.Component {
    state = {
        currentVacationMenu: true,
        pastVacationMenu: false,
        vacationDetails: true,
        calendar: false,
        expenses: false,
        currentVacationIndex: this.props.location.state.currentVacationIndex,
        currentVacationId: this.props.location.state.currentVacationId,
        currentVacationTitle: this.props.location.state.currentVacationTitle
    }

    displayCurrentVacationContent = event => {
        this.setState({
            vacationDetails: false,
            calendar: false,
            expenses: false,
        });
        this.setState({
            [event.currentTarget.id]: true
        })
    };

    render() {
        const { classes } = this.props;
        const { vacationDetails, calendar, expenses, currentVacationIndex, currentVacationId, currentVacationTitle } = this.state;
        const currentVacation = this.context.state.myCurrentVacations[currentVacationIndex];

        return (
            <main className={classes.main}>
                <HomeNavbar 
                data={this.state}
                displayCurrentVacationContent = {this.displayCurrentVacationContent}
                />
                <div className={classes.innerContainer}>
                
                    {vacationDetails ? (
                        <Vacations  title={currentVacationTitle} vacationsId={currentVacationId}>
                        </Vacations>
                       /*  <h1>In Vacation Details Page<br /> <br/> */
                       /*  Current Vacation Details: Index: {currentVacationIndex}, ID: {currentVacationId}, Title: {currentVacationTitle}</h1> */ 
                    ): null }
                    {calendar ? (
                              <Events title={currentVacationTitle} vacationsId={currentVacationId}>
                              </Events>
                        /*  <h1>In Calendar<br /> <br/> */
                       /*  Current Vacation Details: Index: {currentVacationIndex}, ID: {currentVacationId}, Title: {currentVacationTitle}</h1> */ 
                    ): null }
                    {expenses ? (
                        <AddUsers title={currentVacationTitle} vacationsId={currentVacationId}>
                        </AddUsers>
                       /*   <h1>In Expenses<br /> <br/> */
                       /*  Current Vacation Details: Index: {currentVacationIndex}, ID: {currentVacationId}, Title: {currentVacationTitle}</h1> */ 
                    ): null}
                </div>
            </main>
        );
    }
}

CurrentVacationDashboard.contextType = AppContext;

export default withStyles(styles)(CurrentVacationDashboard);