import React, { Fragment, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Fade,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { dataStyles } from "../styles";
import StudentPreview from "./StudentPreview";
import Backdrop from "@mui/material/Backdrop";
import { Link } from "react-router-dom";
import { deleteStudent } from "../../../actions/student";
import { singleStudent } from "../../../actions/student";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Actions = ({ studentId, deleteStudent, singleStudent, student }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <ButtonGroup>
        <Button
          variant="text"
          size="small"
          className={classes.stdPreviewIcon}
          onClick={() => setOpen(true)}
        >
          <PreviewIcon />
        </Button>
        <Link
          variant="text"
          size="small"
          className={classes.stdEditIcon}
          to={`/students/${studentId}/update`}
        >
          <ManageAccountsIcon />
        </Link>
        <Button
          variant="text"
          size="small"
          className={classes.stdDeleteIcon}
          onClick={() => {
            if (window.confirm("Are you sure? ")) {
              deleteStudent(studentId);
            }
          }}
        >
          <DeleteForeverIcon />
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
            {open ? (
              <StudentPreview studentId={studentId} />
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
  student: state.student.student,
});
export default connect(mapStateToProps, { deleteStudent, singleStudent })(
  Actions
);
