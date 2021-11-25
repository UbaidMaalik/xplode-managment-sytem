import { makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { getCourses } from "../../../actions/course";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { dataStyles } from "../styles";
import { Button, Paper } from "@mui/material";
import Actions from "./Actions";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Courses = ({ getCourses, course: { courses, loading } }) => {
  const classes = useStyles();
  useEffect(() => {
    getCourses();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Course", width: 130 },
    { field: "code", headerName: "Course Code", width: 130 },
    {
      field: "period",
      headerName: "Time Period",
      width: 80,
      valueGetter: (params) =>
        `${params.getValue(params.id, "duration") || ""} ${
          params.getValue(params.id, "duration_type") || ""
        }`,
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
  return (
    <div style={{ height: 505, width: "100%" }}>
      <DataGrid
        className={classes.dataTable}
        rows={courses}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
        checkboxSelection
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  course: state.course,
});
export default connect(mapStateToProps, { getCourses })(Courses);