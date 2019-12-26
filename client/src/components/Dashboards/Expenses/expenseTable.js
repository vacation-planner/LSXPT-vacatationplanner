import React, { Component } from 'react';
//import CatchTbl from "../Tables/catchTbl"
import '../App.css';
import ReactTable from "react-table"; 
import "react-table/react-table.css";
import axios from "axios";
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  } from 'react-table'

//const URL = 'https://vacationplannerlx.herokuapp.com/api';
const URL = "http://localhost:5500/api";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventUsers: [],
      //CatchHeaders: [],
      //species: "",
      
    }
     this.renderEditable = this.renderEditable.bind(this);
  }

  componentDidMount() {

    axios
    .get('http://localhost:5050/api/eventUsers')
    .then(response => {
      this.setState(() => ({ eventUsers: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
   // this.setState(() => ({ eventUsers: eventUsers }));
  }
   renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.eventUsers];
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
      <div className="expense-table-display"><div className="expense-header">Expenses:</div><div className="new-table">
      <ReactTable
       data={this.state.eventUsers}
       columns={[
        { Header: "Vacation", accessor: "vacationsId", Cell: this.renderEditable, width: 20},
        { Header: "Participants", accessor: "secondaryUsersId", Cell: this.renderEditable, width: 20},
        { Header: "Event", accessor: "eventsId", Cell: this.renderEditable},
        { Header: "Title", accessor: "title", Cell: this.renderEditable, width: 150},
        { Header: "Expense Total", accessor: "expense", Cell: this.renderEditable},
        { Header: "Participant Expense", accessor: "secondaryUserExpense", Cell: this.renderEditable, width: 25},
        { Header: "Expense Paid", accessor: "expensePaid", Cell: this.renderEditable, width: 20},
    ]}
       defaultPageSize={10}
       style={{
         height: "400px"
       }}
      
       className="-striped -highlight"
     /></div> </div>
    );
  }
}

export default ExpenseTable;