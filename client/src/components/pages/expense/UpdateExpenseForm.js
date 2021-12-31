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
import { updateExpense } from "../../../actions/expense";
import { connect } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const useStyles = makeStyles((theme) => dataStyles(theme));
const UpdateExpenseForm = ({ updateExpense, expense }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    setState({
      title: expense.title,
      amount: expense.amount,
      date: expense.date,
      description: expense.description,
    });
  }, [expense]);

  const { title, amount, date, description } = state;

  const onChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();

    updateExpense(expense._id, state);
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
                label="Date Of borth"
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
    </div>
  );
};
export default connect(null, { updateExpense })(UpdateExpenseForm);
