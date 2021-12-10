import {
  Container,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Button, makeStyles, Typography } from "@material-ui/core";

import { Box } from "@mui/system";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { dataStyles } from "../styles";
import { newCourse } from "../../../actions/course";
import { connect } from "react-redux";
import AAlert from "../../../globals/AAlert";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddCourse = ({ newCourse, alert }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    duration: "",
    code: "",
    duration_type: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { name, code, duration, duration_type } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    newCourse(state);
    if (alert.length === 0) {
      setState({
        name: "",
        code: "",
        duration: "",
        duration_type: "",
      });
    }
  };
  return (
    // <Paper elevation={3}>
    <Box
      style={{ background: "#fff" }}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      className={classes.mainBox}
      onSubmit={onSubmit}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        className={classes.heading}
      >
        Add Courses
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Course Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              label="Course Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-code">
              Course Code
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-code"
              label="Course Code"
              name="code"
              value={code}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-duration">
              Duration{" "}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-duration"
              label="Duration"
              name="duration"
              value={duration}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-duration_type">
              Duration Type{" "}
            </InputLabel>
            {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="durationtype"
              label="Duration Type"
              name="duration_type"
              value={duration_type}
              onChange={onChange}
            >
              <MenuItem value="" selected={!duration_type}>
                Select Duration Type
              </MenuItem>

              <MenuItem value="Year" selected={duration_type === "Year"}>
                Year
              </MenuItem>
              <MenuItem value="Month" selected={duration_type === "Month"}>
                Month
              </MenuItem>
              <MenuItem
                value="Semester"
                selected={duration_type === "Semester"}
              >
                Semester
              </MenuItem>
              <MenuItem value="Week" selected={duration_type === "Week"}>
                Week
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
      <AAlert />
    </Box>
    // </Paper>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});
export default connect(mapStateToProps, { newCourse })(AddCourse);
