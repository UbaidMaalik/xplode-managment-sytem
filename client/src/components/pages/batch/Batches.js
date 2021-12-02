import { makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { dataStyles } from "../styles";
import { getBatches } from "../../../actions/batch";
import Actions from "./Actions";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Batches = ({ getBatches, batch: { batches, loading } }) => {
  const classes = useStyles();
  useEffect(() => {
    getBatches();
  }, []);

  const columns = [
    { field: "sn", headerName: "#", width: 20 },
    {
      field: "course",
      headerName: "Course",
      width: 80,
      valueFormatter: ({ value }) => value.name,
    },
    { field: "name", headerName: "Batch Name", width: 130 },
    { field: "days", headerName: "Days", width: 130 },
    { field: "timing", headerName: "Timing", width: 130 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Actions id={params.getValue(params.id, "_id")} />
      ),
    },
  ];

  const all_batches = [];

  batches.map((batch, index) => all_batches.push({ ...batch, sn: index + 1 }));

  return (
    <div style={{ height: 505, width: "100%" }}>
      <DataGrid
        className={classes.dataTable}
        rows={all_batches}
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
  batch: state.batch,
});

export default connect(mapStateToProps, { getBatches })(Batches);
