import React, { Component } from "react";
import axios from "axios";
import { fire } from "../../Auth/firebaseConfig";

import CustomInput from "../../StyledComponents/Dashboards/Details/CustomInput.js";
import GridContainer from "../../StyledComponents/Dashboards/Details/GridContainer.js";
import GridItem from "../../StyledComponents/Dashboards/Details/GridItem.js";
//import CustomInput from '../../StyledComponents/Dashboards/Details/CustomInput.jsx';

const URL = "http://localhost:5500/api";

  
class Details extends Component {
  constructor(props) {
    super(props);
  this.state = {
    uid: "",
    value: "",
   };
};


render() {
   
    return (
      <div className="details">
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    id="regular"
                    inputProps={{ placeholder: "Regular" }}
                    formControlProps={{ fullWidth: true }}
                />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Success input"
                    id="success"
                    success
                    formControlProps={{ fullWidth: true }}
                />
            </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Details;