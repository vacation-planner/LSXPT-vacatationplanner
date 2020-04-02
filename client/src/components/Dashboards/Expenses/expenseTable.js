import React, { Component } from 'react';
import { AppContext } from '../../Context/AppContext.js';
import ReactTable from "react-table-6"; 
import 'react-table-6/react-table.css'
import axios from "axios";
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
import Button from "../../StyledComponents/Dashboards/Expenses/js/Button.js";
import { Zoom } from "@material-ui/core";
import styles from "../../StyledComponents/Dashboards/Expenses/styles.js";
import withStyles from "@material-ui/core/styles/withStyles";
import "../../StyledComponents/Dashboards/DashBoards.css";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      vacationsId: this.props.vacationsId,
      checked: false,
      allDisabled: true,
      participantDisabled: true,
    }
     this.renderEditable = this.renderEditable.bind(this);
  }

  componentDidMount() {
    this.setState(state => ({ checked: !state.checked }));
    axios
    .get('/expenses')
    .then(response => {
      this.filterEvents(response.data);
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  fetchCurrentParticipant = data => {

  }

  filterEvents = data => {
    console.log("data: ", data)
    let expenses = [];
   
    if (this.props.vacationsId !== undefined) {
    data.forEach((item, index) => {
      if (this.state.vacationsId === item.vacationsId) {
        expenses.push(item);
      }
    })
    this.setState(() => ({ expenses: expenses }));
  } else  if (this.context.state.tempVacationHolder.title === this.props.title) {
    data.forEach((item, index) => {
      if (this.context.state.tempVacationHolder.id === item.vacationsId) {
        expenses.push(item);
      }
    })
    this.setState(() => ({ expenses: expenses,
      vacationsId: this.context.state.tempVacationHolder.id,
     }));
  }

  }
  
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.expenses];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ expenses: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.expenses[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  } 

  render() {
    const { checked } = this.state;
    const { classes } = this.props;
    return (
      <div className="expense-table-display">
      <Zoom in={checked} >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {/* <Card style={{ width: "900px", height: "575px", marginLeft: "50px", marginRight: "100px", top: "20px"}}> */}
            <Card className={classes.cardBodyTable}>
              <div className="expense-header">
                Expenses:
              </div>
              <div className="new-table">
                <ReactTable
                  data={this.state.expenses}
                  columns=
                    {[
                      /* { Header: "Title", accessor: "title", Cell: this.renderEditable, width: 150}, */
                      { 
                        Header: "Event Name", 
                        accessor: "eventName", 
                        Cell: this.renderEditable, width: 90
                      },
                      { 
                        Header: "Participant First Name", 
                        accessor: "secondaryUsersFirstName", 
                        Cell: this.renderEditable, width: 140
                      },
                      { 
                        Header: "Participant Last Name", 
                        accessor: "secondaryUsersLastName", 
                        Cell: this.renderEditable, width: 140
                      },
                     /*  { Header: "Vacation Id", accessor: "vacationsId", Cell: this.renderEditable, width: 80}, */
                      /* { Header: "Participants Id", accessor: "secondaryUsersId", Cell: this.renderEditable, width: 80}, */
                     /*  { Header: "Event Id", accessor: "eventsId", Cell: this.renderEditable, width: 90},  */  
                      { 
                        Header: "Participant Expense", 
                        accessor: "secondaryUsersExpense", 
                        Cell: this.renderEditable, width: 125
                      }, 
                      { 
                        Header: "Expense Owed", 
                        accessor: "expenseOwed", 
                        Cell: this.renderEditable, width: 100
                      },
                      { 
                        Header: "Payee First Name", 
                        accessor: "secondaryUsersPayeeFirstName", 
                        Cell: this.renderEditable, width: 120
                      },
                      { 
                        Header: "Payee Last Name", 
                        accessor: "secondaryUsersPayeeLastName", 
                        Cell: this.renderEditable, width: 120
                      },
                    ]}
                  defaultPageSize={10}
                  style={{
                    height: "500px"
                  }}
      
                  className="-striped -highlight"
                />
              </div> 
              <CardBody className={classes.btnContainer}>
              <Button className={classes.vacationsButton}
                    onClick={() => this.filterEvents(this.props.vacationsId)}
                    color="rose"
                    disabled={this.state.allDisabled}>All
                </Button>
                  <Button className={classes.eventsButton}
                    onClick={() => this.fetchCurrentParticipant(this.props.vacationsId)}
                    color="rose"
                    disabled={this.state.participantDisabled}>Participant
                </Button>
                </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        </Zoom>
      </div>
    );
  }
}

ExpenseTable.contextType = AppContext;

export default withStyles(styles)(ExpenseTable);