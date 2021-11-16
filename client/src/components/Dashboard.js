import React from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@material-ui/core";

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* <Item>xs=8</Item> */}
          <div>22</div>
        </Grid>
        <Grid item xs={4}>
          {/* <Item>xs=4</Item> */}
          <div>22</div>
        </Grid>
        <Grid item xs={4}>
          {/* <Item>xs=4</Item> */}
          <div>22</div>
        </Grid>
        <Grid item xs={8}>
          {/* <Item>xs=8</Item> */}
          <div>22</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
