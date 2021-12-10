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
import { connect } from "react-redux";
import { updateBatch } from "../../../actions/batch";

const useStyles = makeStyles((theme) => dataStyles(theme));
const UpdateBatchForm = ({
  updateBatch,
  batch,
  course: { courses, loading },
}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    course: "",
    name: "",
    days: "",
    timing: "",
  });

  useEffect(() => {
    setState({
      course: batch.course,
      name: batch.name,
      days: batch.days,
      timing: batch.timing,
    });
  }, [batch]);

  const { course, name, days, timing } = state;

  const onChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();

    updateBatch(batch._id, state);
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
              <InputLabel htmlFor="outlined-adornment-course">
                Course{" "}
              </InputLabel>
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
                    <MenuItem value={course._id}>
                      {course.name}-{course.code}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={11}>
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
          <Grid item xs={11}>
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
          <Grid item xs={11}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-timing">
                Timing{" "}
              </InputLabel>
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  course: state.course,
});
export default connect(mapStateToProps, { updateBatch })(UpdateBatchForm);
