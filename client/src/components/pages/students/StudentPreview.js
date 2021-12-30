import React, { Fragment, useEffect } from "react";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import { dataStyles } from "../styles";
import { singleStudent } from "../../../actions/student";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import CircularProgress from "@mui/material/CircularProgress";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIcon from "@mui/icons-material/Phone";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import TodayIcon from "@mui/icons-material/Today";
import CampaignIcon from "@mui/icons-material/Campaign";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import moment from "moment";
import HomeIcon from "@mui/icons-material/Home";

const useStyles = makeStyles((theme) => dataStyles(theme));
const StudentPreview = ({
  studentId,
  singleStudent,
  student: { student, loading },
}) => {
  const classes = useStyles();
  useEffect(() => {
    singleStudent(studentId);
  }, [studentId]);

  return (
    <Fragment>
      <Box className={classes.stdPreview}>
        {loading && <CircularProgress />}
        {!loading && student && (
          <Fragment>
            <Card key={student._id} className={classes.stdPrevCards}>
              <CardActionArea>
                <CardMedia
                  className={classes.stdImageBanner}
                  component="img"
                  height="140"
                  image="/images/previewBanner1.jpg"
                  alt="student photo"
                />
                <div className={classes.stdPrevBottomBorder}>
                  <div className={classes.stdName}>
                    <span>
                      {student.name} s/o {student.father_name}
                    </span>
                  </div>
                  <div className={classes.stdBatch}>
                    <span>{student.batch.name}</span>
                  </div>
                </div>
                <div
                  className={classes.stdPrevAvatar}
                  style={{
                    background: `url(uploads/students/images/${student.image}) no-repeat center / cover`,
                  }}
                ></div>
                <CardContent className={classes.stdPrevContent}></CardContent>
              </CardActionArea>
            </Card>

            <Grid container spacing={0}>
              <Grid xs={11} sm={11} md={4} className={classes.stdPrevstyleBox3}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={classes.stdHeading}
                >
                  Attachments
                </Typography>
                {student.attachments.map((attachment) => (
                  <div className={classes.stdAttachment}>
                    <div className="card-header">
                      <CloudDownloadRoundedIcon sx={{ color: "#fff" }} />
                    </div>
                    <div className={classes.stdhr}></div>
                    <div
                      className="card-body"
                      style={{ color: "#fff", marginTop: "10px" }}
                    >
                      {attachment.substr(-15)}
                    </div>
                    <div className="card-footer">
                      <a
                        target="_blank"
                        href={`http://localhost:3000/uploads/students/attachments/${attachment}`}
                        className={classes.stdLink}
                      >
                        <Button
                          variant="contained"
                          className={classes.stdDownloadBtn}
                        >
                          Download
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </Grid>

              <Grid xs={11} sm={11} md={7} className={classes.stdPrevstyleBox2}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={classes.stdHeading}
                >
                  About
                </Typography>
                <Grid container>
                  <Grid xs={11} sm={11} md={12}>
                    <div className={classes.stdHeading}>
                      <LocationOnIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {student.address}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <PhoneIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {student.phone_number}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <HomeIcon fontSize="small" className={classes.stdIcons} />{" "}
                      {student.home_phone}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <ContactMailIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {student.nic}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <WcIcon fontSize="small" className={classes.stdIcons} />{" "}
                      {student.gender}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <EmailIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {student.email}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <PermContactCalendarIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {moment(student.d_o_b).format("MMM Do YY")}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <TodayIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />
                      {moment(student.admission_date).format("MMM Do YY")}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <CampaignIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {student.heard_from}
                    </div>
                  </Grid>
                  <Grid xs={11} sm={11} md={4}>
                    <div className={classes.stdHeading}>
                      <AppRegistrationIcon
                        fontSize="small"
                        className={classes.stdIcons}
                      />{" "}
                      {student.reg_number}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )}

        {!loading && !student && <h2>No record found</h2>}
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { singleStudent })(StudentPreview);
