import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { layoutStyles } from "./layoutStyles";
import Nav from "../topbar/Nav";
import AppBar from "../topbar/AppBar";

const useStyles = makeStyles((theme) => layoutStyles(theme));
const Layout = ({ children }) => {
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(false);
  const funcSetIsMobile = () => {
    setIsMobile(!isMobile);
  };
  return (
    <div className={classes.root}>
      <Nav children={children} />
      {/* <AppBar children={children} /> */}
    </div>
  );
};

export default Layout;
