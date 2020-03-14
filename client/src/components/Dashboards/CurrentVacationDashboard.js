import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeNavbar from './Navbar/HomeNavbar.js';
import Vacations from "../Dashboards/Vacations/"
import Events from "../Dashboards/Events/";
import Expenses from "../Dashboards/Expenses/";
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
        addParticipants: false,
        calendar: false,
        events: false,
        expenses: false,
        overview: false,
        currentVacationIndex: this.props.location.state.index,
        currentVacationId: this.props.location.state.currentVacationId,
        currentVacationTitle: this.props.location.state.currentVacationTitle,
        currentVacation: this.props.location.state.currentVacation,
    }

    displayCurrentVacationContent = event => {
        this.setState({
            vacationDetails: false,
            addParticipants: false,
            calendar: false,
            events: false,
            expenses: false,
            overview: false,
        });
        this.setState({
            [event.currentTarget.id]: true
        })
    };

    render() {
        const { classes } = this.props;
        const { vacationDetails, addParticipants, calendar, events, expenses, overview, currentVacationId, currentVacationTitle, currentVacation } = this.state;

        return (
            <main className={classes.main}>
                <HomeNavbar
                    data={this.state}
                    displayCurrentVacationContent={this.displayCurrentVacationContent}
                />
                <div className={classes.innerContainer}>

                    {vacationDetails ? (
                        <Vacations title={currentVacationTitle} vacationsId={currentVacationId} vacation={currentVacation} />
                    ) : null}

                    {addParticipants ? (
                        <AddUsers title={currentVacationTitle} vacationsId={currentVacationId} />
                    ) : null}

                    {calendar ? (
                        <EventsCalendar title={currentVacationTitle} vacationsId={currentVacationId} />
                    ) : null}

                    {events ? (
                         <Events title={currentVacationTitle} vacationsId={currentVacationId}>
                        </Events> 
                    ) : null}

                    {expenses ? (
                        <Expenses title={currentVacationTitle} vacationsId={currentVacationId} />
                         
                    ) : null}

                    {overview ? (
                       <ExpenseTable title={currentVacationTitle} vacationsId={currentVacationId} />
                    ) : null}
                </div>
            </main>
        );
    }
}

CurrentVacationDashboard.contextType = AppContext;

export default withStyles(styles)(CurrentVacationDashboard);