import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { dataStyles } from "../styles";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddStudent = () => {
  const classes = useStyles();
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      className={classes.mainBox}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        className={classes.heading}
      >
        Add Students
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-studentName">
              Student Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-studentName"
              label="Student Name"
              name="studentName"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-parents">
              Parents / Guardian
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-parents"
              label="Parents / Guardian"
              name="parents"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-phoneNumber">
              Phone Number{" "}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-phoneNumber"
              label="Phone Number"
              name="phoneNumber"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-address">
              Address{" "}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              label="Address"
              name="address"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-durationType">
              Gender{" "}
            </InputLabel>
            {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="gender"
              label="Gender"
              name="gender"
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddStudent;
