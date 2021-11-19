import {
  Avatar,
  Button,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { rootStyles } from "../globals/styles";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { register } from "../actions/auth";
import Alert from "../globals/Alert";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => rootStyles(theme));
const Signup = ({ register, auth: { isAuthenticated, loading } }) => {
  const classes = useStyles();
  // create state variables for each input
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({
    isVisible: false,
    type: "",
    text: "",
  });

  const { name, email, password, confirmPassword } = state;

  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage({
        isVisible: true,
        type: "danger",
        text: "Passwords do not match",
      });
    }

    setMessage({ isVisible: false, text: "", type: "" });

    const user = {
      name,
      email,
      password,
    };

    register(user);

    setState({
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    });
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return !loading && isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="main-bg">
      <Paper className={classes.paper} elevation={0}>
        <img
          src="images/logo1.png"
          className={classes.logoInner}
          style={{ width: "150px" }}
        />
        <form className={classes.root} onSubmit={onSubmit}>
          <TextField
            label="User Name"
            variant="outlined"
            required
            id="name"
            name="name"
            onChange={onChange}
            value={name}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              fullWidth={true}
              className={classes.button}
              fullWidth
            >
              Signup
            </Button>
          </div>
          <div className={classes.text}>
            Aleady have an account?
            <Button variant="text" component={Link} to="/login">
              Sign in
            </Button>
          </div>
          {message.isVisible && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}
        </form>
        <div className="message">
          <Alert />
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { register })(Signup);
