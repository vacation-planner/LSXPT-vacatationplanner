import React, { Component } from "react";
import Display from "./display.js";
import GridContainer from "../../StyledComponents/Dashboards/Vacations/js/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Vacations/js/GridItem.js";
import "../../StyledComponents/Dashboards/Vacations/vacations.css";
import { AppContext } from '../../Context/AppContext.js';

// const useStyles = makeStyles(styles);

// const URL = "http://localhost:5500/api";
//const URL = 'https://vacationplannerlx.herokuapp.com/api';

class Vacations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      value: "",
      title: this.props.title,
      vacationsId: this.props.vacationsId,
      premium: this.props.premium,
    };
  };


  render() {

    return (
      <div className="vacations">
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Display title={this.state.title} vacationsId={this.state.vacationsId} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Vacations.contextType = AppContext;

export default Vacations;