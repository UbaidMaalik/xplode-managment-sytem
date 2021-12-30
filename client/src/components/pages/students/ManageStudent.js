import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, MenuItem } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { dataStyles } from "../styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonSearch from "@mui/icons-material/PersonSearch";
import { getStudents, getStudentsByBatch } from "../../../actions/student";
import { connect } from "react-redux";
import Students from "./Students";
import { getBatches } from "../../../actions/batch";

const useStyles = makeStyles((theme) => dataStyles(theme));
const ManageStudent = ({
  getStudents,
  getStudentsByBatch,
  getBatches,
  student,
  batch: { batches, loading },
}) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  useEffect(() => {
    getBatches();
  }, []);

  const onChange = (e) => setKeyword(e.target.value);
  const onChangeBatch = (e) => setSelectedBatch(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    getStudents(keyword);
  };
  const onSubmitBatch = (e) => {
    e.preventDefault();

    getStudentsByBatch(selectedBatch);
  };
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2} className={classes.styleBox1}>
          <PersonSearch sx={{ fontSize: 40 }} className={classes.cardIcon} />

          <Grid xs={11} sm={11} md={6}>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              {/* <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
              <TextField
                sx={{ width: "45ch", marginRight: "20px !important" }}
                id="input-with-sx"
                label="Search Student by Name / Registeration No."
                variant="standard"
                type="search"
                value={keyword}
                onChange={onChange}
              />
              <Grid xs={1} sm={1} md={1}>
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

          <Grid xs={11} sm={11} md={1}></Grid>
          <Grid xs={11} sm={11} md={5}>
            <Box
              component="form"
              onSubmit={onSubmitBatch}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-batch">
                  Batch{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="batch"
                  label="Batch"
                  name="batch"
                  // value={batch}
                  onChange={onChangeBatch}
                >
                  {!loading &&
                    batches.length &&
                    batches.map((batch) => (
                      <MenuItem value={batch._id}>
                        {batch.name}-{batch.code}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Grid xs={1} sm={1} md={1}>
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
          <Grid container spacing={2} className={classes.stdCard}>
            <Students />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
  batch: state.batch,
});
export default connect(mapStateToProps, {
  getStudents,
  getStudentsByBatch,
  getBatches,
})(ManageStudent);
