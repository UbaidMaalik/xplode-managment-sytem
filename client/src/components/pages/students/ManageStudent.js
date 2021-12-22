import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { dataStyles } from "../styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonSearch from "@mui/icons-material/PersonSearch";
import { getStudents } from "../../../actions/student";
import { connect } from "react-redux";
import Students from "./Students";

const useStyles = makeStyles((theme) => dataStyles(theme));
const ManageStudent = ({ getStudents }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");

  const onChange = (e) => setKeyword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    getStudents(keyword);
  };
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2} className={classes.styleBox1}>
          <PersonSearch sx={{ fontSize: 40 }} className={classes.cardIcon} />
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Grid xs={6} sm={6} md={11}>
              {/* <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
              <TextField
                fullWidth
                id="input-with-sx"
                label="Search Student by Name / Registeration No."
                variant="standard"
                type="search"
                value={keyword}
                onChange={onChange}
              />
            </Grid>

            <Grid xs={6} sm={6} md={1}>
              <Button
                variant="contained"
                type="submit"
                className={classes.stdBtn}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2} className={classes.styleBox1}>
          <Students />
        </Grid>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { getStudents })(ManageStudent);
