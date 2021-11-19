import {
  Container,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";

const Courses = () => {
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
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Course Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-courseName"
              label="Course Name"
              name="courseName"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-courseCode">
              Course Code
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-courseCode"
              label="Course Code"
              name="courseCode"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-duration">
              Duration{" "}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-duration"
              label="Duration"
              name="duration"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-durationType">
              Duration Type{" "}
            </InputLabel>
            {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="durationtype"
              label="Duration Type"
              name="durationType"
            >
              <MenuItem value={1}>Year</MenuItem>
              <MenuItem value={2}>Month</MenuItem>
              <MenuItem value={3}>Semester</MenuItem>
              <MenuItem value={4}>Week</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
    // </Paper>
  );
};

export default Courses;
