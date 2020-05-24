import React from 'react';
import { AppContext } from '../../Context/AppContext.js';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import BackgroundImage from '../../../images/bg-pricing.jpg';

const styles = (theme) => ({
    actionButtonsActive: {
        color: 'white',
        fontSize: '1.2rem',
        marginLeft: 0,
        marginRight: 0,
        padding: '12px 30px',
        backgroundColor: '#EC6D98',
        [theme.breakpoints.down(1000)]: {
            width: '100%',
            marginTop: '4px',
            marginBottom: '4px',
        },
    },
    actionButtonsInactive: {
        color: 'white',
        fontSize: '1.2rem',
        marginLeft: 0,
        marginRight: 0,
        padding: '12px 30px',
        [theme.breakpoints.down(1000)]: {
            width: '100%',
            backgroundColor: '#AA1649',
            marginTop: '4px',
            marginBottom: '4px',
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E91E63',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        minHeight: '65px',
        padding: '10px 8px',
        [theme.breakpoints.down(1000)]: {
            flexDirection: 'column',
            padding: '8px 20px',
        },
    },
    card: {
        overflow: 'visible',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    containerDiv: {
        width: '100%',
        height: 'auto',
        minHeight: 'calc(100vh - 65px)',
        backgroundImage: `url(${BackgroundImage})`,
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        [theme.breakpoints.down(800)]: {
            paddingRight: '1px',
            paddingLeft: '1px',
        },
    },
    reactTable: {
        fontSize: '1.2rem',
        minHeight: '500px',
        width: '100%',
        [theme.breakpoints.down(800)]: {
            width: '100%',
            maxWidth: '540px',
        },
        [theme.breakpoints.down(780)]: {
            width: '100%',
            maxWidth: '520px',
        },
        [theme.breakpoints.down(760)]: {
            width: '100%',
            maxWidth: '500px',
        },
        [theme.breakpoints.down(740)]: {
            width: '100%',
            maxWidth: '480px',
        },
        [theme.breakpoints.down(720)]: {
            width: '100%',
            maxWidth: '460px',
        },
        [theme.breakpoints.down(700)]: {
            width: '100%',
            maxWidth: '440px',
        },
        [theme.breakpoints.down(680)]: {
            width: '100%',
            maxWidth: '420px',
        },
        [theme.breakpoints.down(660)]: {
            width: '100%',
            maxWidth: '400px',
        },
        [theme.breakpoints.down(640)]: {
            width: '100%',
            maxWidth: '380px',
        },
        [theme.breakpoints.down(620)]: {
            width: '100%',
            maxWidth: '360px',
        },
        [theme.breakpoints.down(600)]: {
            width: '100%',
            maxWidth: 'none',
        },
    },
    renderEditableDiv: {
        backgroundColor: '#fafafa',
        wordBreak: 'break-word',
        textOverflow: 'auto',
        whiteSpace: 'normal',
    },
});

class OverviewTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            participantExpenses: [],
            vacationsId: this.props.vacationsId,
            participantId: null,
            checked: false,
            showAllExpenses: false,
            showParticipantExpenses: false,
        };
        this.renderEditable = this.renderEditable.bind(this);
    }

    componentDidMount() {
        this.setState((state) => ({ checked: !state.checked }));
        axios
            .get('/expenses')
            .then((response) => {
                this.filterEvents(response.data);
                this.filterCurrentParticipant();
            })
            .catch((error) => {
                console.error('Server Error', error);
            });
    }

    activateAllExpenses = () => {
        this.setState({
            showAllExpenses: true,
            showParticipantExpenses: false,
        });
    };

    activateParticipantExpenses = () => {
        this.setState({
            showAllExpenses: false,
            showParticipantExpenses: true,
        });
    };
    
    filterCurrentParticipant = () => {
        console.log(this.state.expenses);
        axios
            .get('/secondaryUsers')
            .then((response) => {
                response.data.forEach((item, index) => {
                    if (
                        item.firstName === this.context.state.userFirstName &&
                        item.lastName === this.context.state.userLastName &&
                        item.email === this.context.state.userEmail &&
                        item.vacationsId === this.state.vacationsId
                    ) {
                        let participantId = item.id;
                        let participantExpenses = [];
                        console.log(participantId)
                        this.state.expenses.forEach((item, index) => {
                            if (item.secondaryUsersId === participantId) {
                                console.log(item.id, item.secondaryUsersId, participantId)
                                participantExpenses.push(item);
                            }
                        });
                        this.setState({
                            participantId,
                            participantExpenses,
                        });
                        console.log(participantExpenses)
                    }
                });
            })
            .catch((error) => {
                console.log('Servor Error', error);
            });
    };

    filterEvents = (data) => {
        let expenses = [];

        if (this.props.vacationsId !== undefined) {
            data.forEach((item, index) => {
                if (this.state.vacationsId === item.vacationsId) {
                    expenses.push(item);
                }
            });
            this.setState(() => ({
                expenses: expenses,
                showAllExpenses: true,
                showParticipantExpenses: false,
            }));
        } else if (this.context.state.tempVacationHolder.title === this.props.title) {
            data.forEach((item, index) => {
                if (this.context.state.tempVacationHolder.id === item.vacationsId) {
                    expenses.push(item);
                }
            });
            this.setState(() => ({
                expenses: expenses,
                vacationsId: this.context.state.tempVacationHolder.id,
                showAllExpenses: true,
                showParticipantExpenses: false,
            }));
        }
    };

    renderEditable(cellInfo) {
        if(this.state.showAllExpenses === true) {
            return (
                <div
                    className={this.props.classes.renderEditableDiv}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        const data = [...this.state.expenses];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ expenses: data });
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.expenses[cellInfo.index][cellInfo.column.id],
                    }}
                />
            );
        }
        else {
            return (
                <div
                    className={this.props.classes.renderEditableDiv}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        const data = [...this.state.participantExpenses];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ participantExpenses: data });
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.participantExpenses[cellInfo.index][cellInfo.column.id],
                    }}
                />
            );
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.containerDiv}>
                <Card className={classes.card}>
                    <ReactTable
                        data={this.state.showAllExpenses ? this.state.expenses : this.state.participantExpenses}
                        columns={[
                            {
                                Header: 'Event Name',
                                accessor: 'eventName',
                                Cell: this.renderEditable,
                                headerStyle: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    wordBreak: 'break-word',
                                    textOverflow: 'auto',
                                    whiteSpace: 'normal',
                                    fontSize: '1.2rem'
                                },
                            },
                            {
                                Header: 'Participant First Name',
                                accessor: 'secondaryUsersFirstName',
                                Cell: this.renderEditable,
                                headerStyle: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    wordBreak: 'break-word',
                                    textOverflow: 'auto',
                                    whiteSpace: 'normal',
                                    fontSize: '1.2rem'
                                },
                            },
                            {
                                Header: 'Participant Last Name',
                                accessor: 'secondaryUsersLastName',
                                Cell: this.renderEditable,
                                headerStyle: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    wordBreak: 'break-word',
                                    textOverflow: 'auto',
                                    whiteSpace: 'normal',
                                    fontSize: '1.2rem'
                                },
                            },
                            {
                                Header: 'Participant Expense',
                                accessor: 'secondaryUsersExpense',
                                Cell: this.renderEditable,
                                headerStyle: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    wordBreak: 'break-word',
                                    textOverflow: 'auto',
                                    whiteSpace: 'normal',
                                    fontSize: '1.2rem'
                                },
                            },
                            {
                                Header: 'Expense Owed',
                                accessor: 'expenseOwed',
                                Cell: this.renderEditable,
                                headerStyle: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    wordBreak: 'break-word',
                                    textOverflow: 'auto',
                                    whiteSpace: 'normal',
                                    fontSize: '1.2rem'
                                },
                            },
                        ]}
                        defaultPageSize={10}
                        className={`-striped -highlight ${classes.reactTable}`}
                    />
                    <div className={classes.buttonContainer}>
                        <Button
                            className={this.state.showAllExpenses ? classes.actionButtonsActive : classes.actionButtonsInactive}
                            onClick={() => this.activateAllExpenses()}
                            color='rose'
                        >
                            All
                        </Button>
                        <Button
                            className={this.state.showParticipantExpenses ? classes.actionButtonsActive : classes.actionButtonsInactive}
                            onClick={() => this.activateParticipantExpenses()}
                            color='rose'
                        >
                            Participant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}

OverviewTable.contextType = AppContext;

export default withStyles(styles)(OverviewTable);
