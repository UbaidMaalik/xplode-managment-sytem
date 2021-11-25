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

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddBatch = ({ newBatch, getCourses, course: { courses, loading } }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    course: "",
    name: "",
    days: "",
    timing: "",
  });

  useEffect(() => {
    getCourses();
  }, []);

  const { course, name, days, timing } = state;

  const onChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    newBatch(state);
    setState({
      course: "",
      name: "",
      days: "",
      timing: "",
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
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-day">Days</InputLabel>
            <OutlinedInput
              id="outlined-adornment-day"
              label="Days"
              name="days"
              value={days}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-timing">Timing </InputLabel>
            <OutlinedInput
              id="outlined-adornment-timing"
              label="Timing"
              name="timing"
              value={timing}
              onChange={onChange}
            />
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
  );
};

const mapStateToProps = (state) => ({
  course: state.course,
});
export default connect(mapStateToProps, { newBatch, getCourses })(AddBatch);
