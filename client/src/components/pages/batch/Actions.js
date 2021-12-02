import { Button, ButtonGroup } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { dataStyles } from "../styles";
import { makeStyles } from "@material-ui/core";
import { singleBatch } from "../../../actions/batch";
import { deleteBatch } from "../../../actions/batch";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import UpdateBatchForm from "./UpdateBatchForm";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Actions = ({ id, batch, singleBatch, deleteBatch }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const getSingleBatch = (id) => {
    singleBatch(id);
    setOpen(true);
  };

  return (
    <Fragment>
      <ButtonGroup>
        <Button
          variant="text"
          size="small"
          onClick={() => getSingleBatch(id)}
          className={classes.editBtn}
        >
          <EditIcon sx={{ fontSize: "small" }} />
        </Button>

        <Button
          variant="text"
          size="small"
          className={classes.deleteBtn}
          onClick={() => {
            if (window.confirm("Are you sure? ")) {
              deleteBatch(id);
            }
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: "small" }} />
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
            {batch ? <UpdateBatchForm batch={batch} /> : <CircularProgress />}
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  batch: state.batch.batch,
});
export default connect(mapStateToProps, { singleBatch, deleteBatch })(Actions);
