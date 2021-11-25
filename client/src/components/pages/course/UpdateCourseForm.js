import {
  Button,
  capitalize,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AAlert from "../../../globals/AAlert";
import { dataStyles } from "../styles";
import { makeStyles } from "@material-ui/core";
import { updateCourse } from "../../../actions/course";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => dataStyles(theme));
const UpdateCourseForm = ({ updateCourse, course }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    code: "",
    duration: "",
    duration_type: "",
  });

  useEffect(() => {
    setState({
      name: course.name,
      code: course.code,
      duration: course.duration,
      duration_type: capitalize(course.duration_type),
    });
  }, [course]);

  const { name, code, duration, duration_type } = state;

  const onChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();

    updateCourse(course._id, state);
  };
  return (
    <div>
      <Box className={classes.editModel} onSubmit={onSubmit} component="form">
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          className={classes.editHeading}
        >
          Edit Courses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={11}>
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
          <Grid item xs={11}>
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
          <Grid item xs={11}>
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
          <Grid item xs={11}>
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
              className={classes.updateBtn}
            >
              UPDATE
            </Button>
          </Grid>
        </Grid>
        <AAlert />
      </Box>
    </div>
  );
};
export default connect(null, { updateCourse })(UpdateCourseForm);
