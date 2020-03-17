import React, { Component } from 'react';
import ReactTable from "react-table-6"; 
import 'react-table-6/react-table.css'
import axios from "axios";
import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
import { Zoom } from "@material-ui/core";
import "../../StyledComponents/Dashboards/DashBoards.css";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      vacationsId: this.props.vacationsId,
      checked: false,
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

  filterEvents = data => {
    console.log("data: ", data)
    let expenses = [];
    data.forEach((item, index) => {
      if (this.props.vacationsId === item.vacationsId) {
        expenses.push(item);
      }
    })
    this.setState(() => ({ expenses: expenses }));
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
    return (
      <div className="expense-table-display">
      <Zoom in={checked} >
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card style={{ width: "1100px", height: "600px", marginLeft: "50px", marginRight: "100px", top: "20px"}}>
              <div className="expense-header">
                Expenses:
              </div>
              <div className="new-table">
                <ReactTable
                  data={this.state.expenses}
                  columns=
                    {[
                      /* { Header: "Title", accessor: "title", Cell: this.renderEditable, width: 150}, */
                      { Header: "Event Name", accessor: "eventName", Cell: this.renderEditable, width: 90},
                      { Header: "Participant", accessor: "secondaryUsersFirstName", Cell: this.renderEditable, width: 140},
                      { Header: "Vacation Id", accessor: "vacationsId", Cell: this.renderEditable, width: 80},
                      { Header: "Participants Id", accessor: "secondaryUsersId", Cell: this.renderEditable, width: 80},
                      { Header: "Event Id", accessor: "eventsId", Cell: this.renderEditable, width: 90},   
                      { Header: "Participant Expense", accessor: "secondaryUsersExpense", Cell: this.renderEditable, width: 125},
                      { Header: "Expense Owed", accessor: "expenseOwed", Cell: this.renderEditable, width: 100},
                    ]}
                  defaultPageSize={10}
                  style={{
                    height: "500px"
                  }}
      
                  className="-striped -highlight"
                />
              </div> 
            </Card>
          </GridItem>
        </GridContainer>
        </Zoom>
      </div>
    );
  }
}

export default ExpenseTable;