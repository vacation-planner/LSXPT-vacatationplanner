import React, { Component } from "react";
import { render } from "react-dom";
import Cal from "./Calendar/index.js";
import "../StyledComponents/Dashboards/DashBoards.css"

class Dashboards extends Component {
    constructor(props) {
        super()
    }
    state = {
        view: "month",
        date: new Date(2019, 11, 12),
        width: 500
      };
    
    render() {
        return (
        <div className="calendar">
            <Cal>Here is something
            </Cal>
        </div>

        )
    }
};



export default Dashboards;