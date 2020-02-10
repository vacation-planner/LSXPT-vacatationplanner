import React, { Component } from 'react';
import ReactTable from "react-table-6"; 
import 'react-table-6/react-table.css'
import axios from "axios";
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  } from 'react-table';
  import GridContainer from "../../StyledComponents/Dashboards/Expenses/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Expenses/js/GridItem.js";
import Card from "../../StyledComponents/Dashboards/Expenses/js/Card.js";
//import CardBody from "../../StyledComponents/Dashboards/Expenses/js/CardBody.js";
//import CardHeader from "../../StyledComponents/Dashboards/Expenses/js/CardHeader.js"
import "../../StyledComponents/Dashboards/DashBoards.css";

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
//const URL = "http://localhost:5500/api";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      vacationsId: this.props.vacationsId,
      //CatchHeaders: [],
      //species: "",
      
    }
     this.renderEditable = this.renderEditable.bind(this);
  }

  componentDidMount() {
    
    axios
    .get('http://localhost:5500/api/expenses')
    .then(response => {
      this.filterEvents(response.data);
      //this.setState(() => ({ eventUsers: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
   // this.setState(() => ({ eventUsers: eventUsers }));
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
          this.setState({ eventUsers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.eventUsers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  } 

  render() {

    return (
      <div className="expense-table-display">
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card style={{ width: "1100px", height: "700px", marginRight: "100px", top: "20px"}}>
              <div className="expense-header">
                Expenses:
              </div>
              <div className="new-table">
                <ReactTable
                  data={this.state.expenses}
                  columns=
                    {[
                      { Header: "Title", accessor: "title", Cell: this.renderEditable, width: 150},
                      { Header: "Participant", accessor: "secondaryUsersName", Cell: this.renderEditable, width: 140},
                      { Header: "Vacation", accessor: "vacationsId", Cell: this.renderEditable, width: 80},
                      { Header: "Participants", accessor: "secondaryUsersId", Cell: this.renderEditable, width: 80},
                      { Header: "Event", accessor: "eventsId", Cell: this.renderEditable, width: 90},   
                      { Header: "Expense Total", accessor: "amount", Cell: this.renderEditable, width: 100},
                      { Header: "Participant Expense", accessor: "secondaryUsersExpense", Cell: this.renderEditable, width: 125},
                      { Header: "Expense Paid", accessor: "expensePaid", Cell: this.renderEditable, width: 100},
                    ]}
                  defaultPageSize={10}
                  style={{
                    height: "400px"
                  }}
      
                  className="-striped -highlight"
                />
              </div> 
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default ExpenseTable;