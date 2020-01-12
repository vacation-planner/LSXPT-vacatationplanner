import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeNavbar from './Navbar/HomeNavbar.js';
import Vacations from "../Dashboards/Vacations/index.js"
import Events from "../Dashboards/Events/index.js"
import AddUsers from "../Dashboards/AddUsers/addUsers.js"
// import Vacation from "./Calendar/index.js";
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

class PastVacationDashboard extends React.Component {
    state = {
        currentVacationMenu: false,
        pastVacationMenu: true,
        vacationDetails: true,
        calendar: false,
        expenses: false,
        pastVacationIndex: this.props.location.state.index,
        pastVacationId: this.props.location.state.pastVacationId,
        pastVacationTitle: this.props.location.state.pastVacationTitle,
    }

    displayPastVacationContent = event => {
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
        const { vacationDetails, calendar, expenses, pastVacationIndex, pastVacationId, pastVacationTitle } = this.state;
        const pastVacation = this.context.state.myPastVacations[pastVacationIndex];

        return (
            <main className={classes.main}>
                <HomeNavbar
                    data={this.state}
                    displayPastVacationContent = {this.displayPastVacationContent}
                />
                <div className={classes.innerContainer}>
               {/*  <Vacations title={pastVacationTitle} vacationsId={pastVacationId}>
                        </Vacations> */}
                    
                    {vacationDetails ? (
                    
                   /*  <h1>In Vacation Details Page<br /> <br/> */
                         <Vacations title={pastVacationTitle} vacationsId={pastVacationId}>
                        </Vacations>
                    /* Past Vacation Details: Index: {pastVacationIndex}, ID: {pastVacationId}, Title: {pastVacationTitle}</h1> */
                    ): null }
                    {calendar ? (
                       /*  <h1>In Calendar */
                        <Events title={pastVacationTitle} vacationsId={pastVacationId}>
                            </Events>
                       /*  Past Vacation Details: Index: {pastVacationIndex}, ID: {pastVacationId}, Title: {pastVacationTitle}</h1> */
                    ): null }
                    {expenses ? (
                      /*   <h1>In Expenses<br /> <br/> */
                      <AddUsers title={pastVacationTitle} vacationsId={pastVacationId}>
                          </AddUsers>
                       /*  Past Vacation Details: Index: {pastVacationIndex}, ID: {pastVacationId}, Title: {pastVacationTitle}</h1> */
                    ): null}
                </div>
            </main>
        );
    }
}

PastVacationDashboard.contextType = AppContext;

export default withStyles(styles)(PastVacationDashboard);