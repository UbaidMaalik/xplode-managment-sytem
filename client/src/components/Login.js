import {
  Avatar,
  Button,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
// import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { rootStyles } from "../globals/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => rootStyles(theme));
const Login = () => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    handleClose();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="main-bg">
      <Paper className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <PeopleAltIcon className={classes.icon} />
        </Avatar> */}
        <img
          src="images/logo1.png"
          className={classes.logoInner}
          style={{ width: "150px" }}
        />
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              fullWidth={true}
              className={classes.button}
              fullWidth
            >
              Login
            </Button>
          </div>
          <div className={classes.text}>
            Don’t have an account?
            <Button variant="text" component={Link} to="/signup">
              Sign Up
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
