import React, { Fragment, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
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
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CircularProgress from "@mui/material/CircularProgress";
import Actions from "./Actions";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Students = ({ getStudents, student: { students, searchLoading } }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {searchLoading && <CircularProgress />}
      {!searchLoading && !students.length && "Student Record Not Found"}
      {!searchLoading && students.length
        ? students.map((student) => (
            <Grid xs={11} sm={11} md={3} xs={{ marginRight: "10px" }}>
              <Card
                sx={{ maxWidth: 450 }}
                key={student._id}
                className={classes.studentCards}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.stdImageBanner}
                    component="img"
                    height="140"
                    image="/images/previewBanner1.jpg"
                    alt="student photo"
                  />
                  <div className={classes.bottomBorder}>
                    <img src="/images/bottomBorder.png" />
                  </div>

                  <div
                    className={classes.stdAvatar}
                    style={{
                      background: `url(uploads/students/images/${student.image}) no-repeat center / cover`,
                    }}
                  ></div>
                  <CardContent className={classes.stdContent}>
                    <Typography gutterBottom variant="h6" component="div">
                      {student.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {student.phone_number}
                      <br />

                      {student.email}
                    </Typography>
                  </CardContent>
                  <Actions studentId={student._id} />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps)(Students);
