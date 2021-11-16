import { orange } from "@material-ui/core/colors";

const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
const borderLight = "rgba(206,212,218, .993)";
export const rootStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    fontFamily: "Raleway, sans-serif",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "350px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: "80px",
    height: "80px",
    color: "rgba(131,153,167,0.79)",
    alignContent: "center",
  },
  button: {
    color: textLight,
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
    marginTop: theme.spacing(6),
    padding: `${theme.spacing(1)}px`,
    border: "none",
    borderRadius: "5px",
    letterSpacing: "3px",
    width: "92%",
    backgroundColor: "#45a4f5",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  inputs: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: textDark,
    fontSize: "14px",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    // borderRadius: "8px",
    border: "1.4px solid",
    boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
    borderColor: borderLight,

    "&:hover": {
      background: "rgba(169,198,217,0.36457423) ",
    },
  },
  heading: {
    fontWeight: "bold",
  },
  text: {
    marginBottom: "-2em",
  },
});
