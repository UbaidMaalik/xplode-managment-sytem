import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box, button } from "@mui/system";
import { React, Fragment, useState, useEffect } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { dataStyles } from "../styles";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddStudent = () => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [state, setState] = useState({
    studentName: "",
    parents: "",
    phoneNumber: "",
    homePhone: "",
    gender: "",
    nic: "",
    address: "",
    dob: "",
    batch: "",
    email: "",
    photo: null,
    attachments: [],
    addmission: "",
    heardFrom: "",
    regNumber: "",
  });
  const {
    studentName,
    parents,
    phoneNumber,
    homePhone,
    gender,
    nic,
    address,
    dob,
    batch,
    email,
    photo,
    attachments,
    addmission,
    heardFrom,
    regNumber,
  } = state;

  useEffect(() => {
    if (photo) {
      setImageUrl(URL.createObjectURL(photo));
    }
  }, [photo]);

  return (
    <Fragment>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        className={classes.heading}
      >
        Create a new student
      </Typography>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3} className={classes.styleBox}>
            <Button
              variant="contained"
              component="label"
              className={classes.image}
            >
              <AddAPhotoIcon />

              <input
                type="file"
                accept="image/*"
                id="select-image"
                hidden
                onChange={(e) => {
                  console.log(e.target.files);
                  setState({ ...state, photo: e.target.files[0] });
                }}
              />
              {imageUrl && photo && (
                <Box mt={2} textAlign="center">
                  <img
                    src={imageUrl}
                    alt={photo.name}
                    className={classes.previewImage}
                  />
                </Box>
              )}
            </Button>

            <p>Upload Photo</p>
            <p>Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB</p>
          </Grid>
          <Grid xs={12} sm={12} md={8} className={classes.rightBox}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-studentName">
                    Student Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-studentName"
                    label="Student Name"
                    name="studentName"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-parents">
                    Parents / Guardian
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-parents"
                    label="Parents / Guardian"
                    name="parents"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-phoneNumber">
                    Phone Number{" "}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-homePhone">
                    Home Phone{" "}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-homePhone"
                    label="Home Phone"
                    name="homePhone"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-durationType">
                    Gender{" "}
                  </InputLabel>
                  {/* <InputLabel id="demo-simple-select-label">Duration Type</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="gender"
                    label="Gender"
                    name="gender"
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-address">
                    Address{" "}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-adress"
                    label="Address"
                    name="address"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-nic">NIC </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-nic"
                    label="NIC"
                    name="nic"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date Of borth"
                    value={dob}
                    onChange={(newVal) => setState({ ...state, dob: newVal })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={classes.stylingTextField}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
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
                    // onChange={onChange}
                  >
                    {/* {!loading &&
                      courses.length &&
                      courses.map((course) => (
                        <MenuItem
                          value={course._id}
                          // selected={duration_type === "Year"}
                        >
                          {course.name}-{course.code}
                        </MenuItem>
                      ))} */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email (optional){" "}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    label="Email"
                    name="email"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  {/* <InputLabel
                    type="file"
                    htmlFor="outlined-adornment-attachement"
                  >
                    Attachement{" "}
                  </InputLabel> */}
                  <TextField
                    id="outlined-basic"
                    // label="Attachment"
                    variant="outlined"
                    name="attachments"
                    type="file"
                    multiple
                    className={classes.stylingTextField2}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Addmission Date"
                    value={addmission}
                    onChange={(newVal) =>
                      setState({ ...state, addmission: newVal })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={classes.stylingTextField}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-heardFrom">
                    Heard From
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-heardFrom"
                    label="Heard From"
                    name="heardFrom"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-regNumber">
                    Registration Number
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-regNumber"
                    label="Registration Number"
                    name="regNumber"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default AddStudent;
