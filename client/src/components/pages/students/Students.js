import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { dataStyles } from "../styles";
import { getStudents } from "../../../actions/student";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Students = ({ getStudents, student: { students, loading } }) => {
  const classes = useStyles();

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <Fragment>
      {!loading &&
        students.length &&
        students.map((student) => (
          <Card sx={{ maxWidth: 345 }} key={student._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`uploads/students/images/${student.image}`}
                alt="student photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {student.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {student.father_name}
                  <br />
                  {student.phone_number}
                  <br />
                  {student.nic}
                  <br />
                  {student.address}
                  <br />
                  {student.gender}
                  <br />
                  {student.batch}
                  <br />
                  {student.d_o_b}
                  <br />
                  {student.email}
                  <br />
                  {student.admission_date}
                  <br />
                  {student.heard_from}
                  <br />
                  {student.reg_number}
                  <br />
                  {student.home_phone}
                  <br />
                  {student.createdAt}
                  <br />
                  {student.updatedAt}
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { getStudents })(Students);
