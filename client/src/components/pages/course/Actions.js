import { Button, ButtonGroup } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { dataStyles } from "../styles";
import { makeStyles } from "@material-ui/core";
import { singleCourse } from "../../../actions/course";
import { deleteCourse } from "../../../actions/course";
import { connect } from "react-redux";
import UpdateCourseForm from "./UpdateCourseForm";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Actions = ({ id, course, singleCourse, deleteCourse }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const getSingleCourse = (id) => {
    singleCourse(id);
    setOpen(true);
  };

  return (
    <Fragment>
      <ButtonGroup>
        <Button
          variant="text"
          size="small"
          onClick={() => getSingleCourse(id)}
          className={classes.editBtn}
        >
          <EditIcon />
        </Button>

        <Button
          variant="text"
          size="small"
          className={classes.deleteBtn}
          onClick={() => {
            if (window.confirm("Are you sure? ")) {
              deleteCourse(id);
            }
          }}
        >
          <DeleteForeverIcon className={classes.iconColor} />
        </Button>
      </ButtonGroup>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={open}>
          <div>
            {course ? (
              <UpdateCourseForm course={course} />
            ) : (
              <CircularProgress />
            )}
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  course: state.course.course,
});
export default connect(mapStateToProps, { singleCourse, deleteCourse })(
  Actions
);
