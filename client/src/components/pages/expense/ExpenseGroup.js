import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddExpense from "./AddExpense";
import Expenses from "./Expenses";

const ExpenseGroup = () => {
  return (
    <div>
      <Box
        style={{ background: "#fff" }}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <Expenses />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AddExpense />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ExpenseGroup;
