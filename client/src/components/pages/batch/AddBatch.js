import React, { useEffect, useState } from "react";
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
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { dataStyles } from "../styles";
import AAlert from "../../../globals/AAlert";
import { newBatch } from "../../../actions/batch";
import { getCourses } from "../../../actions/course";
import { connect } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileTimePicker from "@mui/lab/MobileTimePicker";

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddBatch = ({ newBatch, getCourses, course: { courses, loading } }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    course: "",
    name: "",
    dayFrom: "",
    dayTo: "",
    timeTo: new Date("2018-01-01T00:00:00.000Z"),
    timeFrom: new Date("2018-01-01T00:00:00.000Z"),
  });

  useEffect(() => {
    getCourses();
  }, []);

  const { course, name, dayFrom, dayTo, timeTo, timeFrom } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    newBatch(state);
    setState({
      course: "",
      name: "",
      dayFrom: "",
      dayTo: "",
      timeTo: "",
      timeFrom: "",
    });
  };

  return (
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
        Add Batch
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-course">Course </InputLabel>
            {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="course"
              label="Course"
              name="course"
              value={course}
              onChange={onChange}
            >
              {!loading &&
                courses.length &&
                courses.map((course) => (
                  <MenuItem
                    value={course._id}
                    // selected={duration_type === "Year"}
                  >
                    {course.name}-{course.code}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Batch Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              label="Batch Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-course">Day </InputLabel>
            {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="dayFrom"
              label="Day From"
              name="dayFrom"
              value={dayFrom}
              onChange={onChange}
            >
              <MenuItem>Sunday</MenuItem>
              <MenuItem>Monday</MenuItem>
              <MenuItem>Tuesday</MenuItem>
              <MenuItem>Wednesday</MenuItem>
              <MenuItem>Thursday</MenuItem>
              <MenuItem>Friday</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <p>To</p>
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-course">Day</InputLabel>
            {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="dayTo"
              label="Day To"
              name="dayTo"
              value={dayTo}
              onChange={onChange}
            >
              <MenuItem>Sunday</MenuItem>
              <MenuItem>Monday</MenuItem>
              <MenuItem>Tuesday</MenuItem>
              <MenuItem>Wednesday</MenuItem>
              <MenuItem>Thursday</MenuItem>
              <MenuItem>Friday</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              {/* <FormControl fullWidth sx={{ m: 1 }}> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <TimePicker
                    label="Time From"
                    value={timeFrom}
                    name="timeFrom"
                    onChange={(newVal) =>
                      setState({ ...state, timeFrom: newVal })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className={classes.stylingTextField}
                      />
                    )}
                  />
                  <TimePicker
                    label="Time To"
                    value={timeTo}
                    name="timeTo"
                    onChange={(newVal) =>
                      setState({ ...state, timeTo: newVal })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className={classes.stylingTextField}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
              {/* </FormControl> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
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
  );
};

const mapStateToProps = (state) => ({
  course: state.course,
});
export default connect(mapStateToProps, { newBatch, getCourses })(AddBatch);
