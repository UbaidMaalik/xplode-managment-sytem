import {
  Avatar,
  Button,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { rootStyles } from "../globals/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import AAlert from "../globals/AAlert";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => rootStyles(theme));
const Login = ({ login, auth }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = setState;

  const onChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    // Create account
    login(state);

    setState({
      email: "",
      password: "",
    });
  };

  if (!auth.loading && auth.isAuthenticated) {
    return <Redirect to={Dashboard} />;
  }
  return (
    <div className="main-bg">
      <Paper className={classes.paper} elevation={0}>
        <img
          src="images/logo1.png"
          className={classes.logoInner}
          style={{ width: "150px" }}
        />
        <form className={classes.root} onSubmit={onSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={onChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            required
            value={password}
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
        <AAlert />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
