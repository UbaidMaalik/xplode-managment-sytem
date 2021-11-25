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
    { field: "_id", headerName: "ID", width: 70 },
    { field: "course", headerName: "Course", width: 70 },
    { field: "name", headerName: "Batch", width: 130 },
    { field: "days", headerName: "Days", width: 130 },
    { field: "timing", headerName: "Timing", width: 130 },
    // {
    //   field: "period",
    //   headerName: "Time Period",
    //   width: 80,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, "duration") || ""} ${
    //       params.getValue(params.id, "duration_type") || ""
    //     }`,
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Actions id={params.getValue(params.id, "_id")} />
      ),
    },
  ];
  return (
    <div style={{ height: 505, width: "100%" }}>
      <DataGrid
        className={classes.dataTable}
        rows={batches}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
        loading={loading}
        checkboxSelection
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  batch: state.batch,
});

export default connect(mapStateToProps, { getBatches })(Batches);
