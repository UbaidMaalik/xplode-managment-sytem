export const dataStyles = (theme) => ({
  mainBox: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "2em",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    // },
  },
  dataTable: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    border: "0 !important",
    padding: "2em",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
  },
  heading: {
    textAlign: "left",
  },
  editHeading: {
    textAlign: "center",
  },
  submitBtn: {
    backgroundColor: "#1976d2",
    boxShadow: "rgb(24 144 255 / 24%) 0px 8px 16px 0px",
    float: "right",
    color: "#fff",
    marginTop: "1.5em",
    marginBottom: "0.5em",
    "&:hover": {
      backgroundColor: "rgb(24, 144, 255)",
      border: "0",
      boxShadow: "#fff 0px 8px 16px 0px",
    },
  },
  updateBtn: {
    backgroundColor: "#1976d2",
    boxShadow: "rgb(24 144 255 / 24%) 0px 8px 16px 0px",
    float: "right",
    color: "#fff",
    marginTop: "1.5em",
    marginBottom: "1.5em",
    "&:hover": {
      backgroundColor: "rgb(24, 144, 255)",
      border: "0",
      boxShadow: "#fff 0px 8px 16px 0px",
    },
  },
  editModel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 450,
    bgcolor: "background.paper",
    backgroundColor: "#fff",
    borderRadius: "3px",
    border: "1px solid #eee",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
    p: 10,
    alignContent: "center",
  },
  modal: {
    textAlign: "center",
  },
  editBtn: {
    // backgroundColor: "1976d2 !important",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px !important",
    float: "right",
    color: "#fff",
    marginTop: "1.5em",
    marginBottom: "0.5em",
    "&:hover": {
      // backgroundColor: "rgb(24, 144, 255) !important",
      border: "0",
      boxShadow: "#1976d200 0px 8px 16px 0px",
    },
  },
  deleteBtn: {
    // backgroundColor: "rgb(255, 72, 66) !important",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px !important",
    float: "right",
    color: "#d10707 !important",
    marginTop: "1.5em",
    marginBottom: "0.5em",
    "&:hover": {
      // backgroundColor: "rgb(183, 33, 54) !important",
      border: "0",
      boxShadow: "#1976d200 0px 8px 16px 0px",
    },
  },
  iconColor: {
    color: "red !important",
  },
});
