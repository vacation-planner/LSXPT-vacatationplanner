import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "../../StyledComponents/Dashboards/AddUsers/material-dashboard-pro-react.css";

const style = {
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  }
};

const useStyles = makeStyles(style);

export default function DateTimePicker() {
  const classes = useStyles();
  return (
    <div>
      <InputLabel className={classes.label}>
        Datetime Picker
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          inputProps={{ placeholder: "Datetime Picker Here" }}
        />
      </FormControl>
      <InputLabel className={classes.label}>
        Date Picker
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          timeFormat={false}
          inputProps={{ placeholder: "Date Picker Here" }}
        />
      </FormControl>
      <InputLabel className={classes.label}>
        Time Picker
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          dateFormat={false}
          inputProps={{ placeholder: "Time Picker Here" }}
        />
      </FormControl>
    </div>
  );
}