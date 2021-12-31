import {
  Container,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { Button, makeStyles, Typography } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { dataStyles } from "../styles";
import { newExpense } from "../../../actions/expense";
import { connect } from "react-redux";
import AAlert from "../../../globals/AAlert";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddExpense = ({ newExpense, alert }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    amount: "",
    date: new Date(),
    description: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { title, amount, date, description } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    newExpense(state);
    if (alert.length === 0) {
      setState({
        title: "",
        amount: "",
        date: new Date("2018-01-01T00:00:00.000Z"),
        description: "",
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
        Add Expenses
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Expense Title
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              label="Course Name"
              name="title"
              value={title}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-code">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-code"
              label="Course Code"
              name="amount"
              value={amount}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newVal) => setState({ ...state, date: newVal })}
              renderInput={(params) => (
                <TextField {...params} className={classes.stylingTextField} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-duration">
              Description{" "}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-duration"
              label="Duration"
              name="description"
              value={description}
              onChange={onChange}
            />
          </FormControl>
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
    // </Paper>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});
export default connect(mapStateToProps, { newExpense })(AddExpense);
