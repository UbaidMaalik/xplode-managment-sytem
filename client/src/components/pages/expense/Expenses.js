import { makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { getExpenses } from "../../../actions/expense";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { dataStyles } from "../styles";
import { Button, Paper } from "@mui/material";
import Actions from "./Actions";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Expenses = ({ getExpenses, expense: { expenses, loading } }) => {
  const classes = useStyles();
  useEffect(() => {
    getExpenses();
  }, []);

  const columns = [
    // { field: "_id", headerName: "ID", width: 70 },
    { field: "sn", headerName: "#", width: 20 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      //   valueGetter: (params) =>
      //     `${params.getValue(params.id, "duration") || ""} ${
      //       params.getValue(params.id, "duration_type") || ""
      //     }`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Actions id={params.getValue(params.id, "_id")} />
      ),
    },
  ];
  const all_expenses = [];

  expenses.map((expense, index) =>
    all_expenses.push({ ...expense, sn: index + 1 })
  );
  return (
    <div style={{ height: 505, width: "100%" }}>
      <DataGrid
        className={classes.dataTable}
        rows={all_expenses}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  expense: state.expense,
});
export default connect(mapStateToProps, { getExpenses })(Expenses);
