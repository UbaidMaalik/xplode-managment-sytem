import { Button, ButtonGroup } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { dataStyles } from "../styles";
import { makeStyles } from "@material-ui/core";
import { singleExpense } from "../../../actions/expense";
import { deleteExpense } from "../../../actions/expense";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import UpdateExpenseForm from "./UpdateExpenseForm";

const useStyles = makeStyles((theme) => dataStyles(theme));
const Actions = ({ id, expense, singleExpense, deleteExpense }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const getSingleExpense = (id) => {
    singleExpense(id);
    setOpen(true);
  };

  return (
    <Fragment>
      <ButtonGroup>
        <Button
          variant="text"
          size="small"
          onClick={() => getSingleExpense(id)}
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
              deleteExpense(id);
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
            {expense ? (
              <UpdateExpenseForm expense={expense} />
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
  expense: state.expense.expense,
});
export default connect(mapStateToProps, { singleExpense, deleteExpense })(
  Actions
);
