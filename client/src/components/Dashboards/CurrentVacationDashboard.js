import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeNavbar from './Navbar/HomeNavbar.js';
import Vacations from "../Dashboards/Vacations/"
import Events from "../Dashboards/Events/";
import EventsCalendar from "../Dashboards/Events/eventsCalendar.js";
//import Expenses from "../Dashboards/Events/";
import AddUsers from "../Dashboards/AddUsers/addUsers.js";
import ExpenseTable from "../Dashboards/Expenses/expenseTable.js";
import { AppContext } from '../Context/AppContext.js';

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
        events: false,
        expenses: false,
        currentVacationIndex: this.props.location.state.index,
        currentVacationId: this.props.location.state.currentVacationId,
        currentVacationTitle: this.props.location.state.currentVacationTitle
    }

    displayCurrentVacationContent = event => {
        this.setState({
            vacationDetails: false,
            calendar: false,
            events: false,
            expenses: false,
        });
        this.setState({
            [event.currentTarget.id]: true
        })
    };

    render() {
        const { classes } = this.props;
        const { vacationDetails, calendar, events, expenses, currentVacationId, currentVacationTitle } = this.state;

        return (
            <main className={classes.main}>
                <HomeNavbar
                    data={this.state}
                    displayCurrentVacationContent={this.displayCurrentVacationContent}
                />
                <div className={classes.innerContainer}>

                    {vacationDetails ? (
                        <Vacations title={currentVacationTitle} vacationsId={currentVacationId}>
                        </Vacations>
                    ) : null}

                    {calendar ? (
                        <EventsCalendar title={currentVacationTitle} vacationsId={currentVacationId}>
                        </EventsCalendar>
                    ) : null}

                    {events ? (
                         <Events title={currentVacationTitle} vacationsId={currentVacationId}>
                        </Events> 
                    ) : null}

                    {expenses ? (
                        <ExpenseTable title={currentVacationTitle} vacationsId={currentVacationId} >
                         </ExpenseTable>
                    ) : null}
                </div>
            </main>
        );
    }
}

CurrentVacationDashboard.contextType = AppContext;

export default withStyles(styles)(CurrentVacationDashboard);