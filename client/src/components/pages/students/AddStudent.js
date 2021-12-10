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
import { getBatches } from "../../../actions/batch";
import TextField from "@mui/material/TextField";
import { newStudent } from "../../../actions/student";
import { connect } from "react-redux";
import AAlert from "../../../globals/AAlert";

const useStyles = makeStyles((theme) => dataStyles(theme));
const AddStudent = ({
  newStudent,
  alert,
  getBatches,
  batch: { batches, loading },
}) => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [state, setState] = useState({
    name: "",
    father_name: "",
    phone_number: "",
    home_phone: "",
    gender: "",
    nic: "",
    address: "",
    d_o_b: "",
    batch: "",
    email: "",
    image: null,
    attachment: [],
    admission_date: "",
    heard_from: "",
    reg_number: "",
  });
  const {
    name,
    father_name,
    phone_number,
    home_phone,
    gender,
    nic,
    address,
    d_o_b,
    batch,
    email,
    image,
    attachment,
    admission_date,
    heard_from,
    reg_number,
  } = state;

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {
    getBatches();
  }, []);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    newStudent(state);
    if (alert.length === 0) {
      setState({
        name: "",
        father_name: "",
        phone_number: "",
        home_phone: "",
        gender: "",
        nic: "",
        address: "",
        d_o_b: new Date("2018-01-01T00:00:00.000Z"),
        batch: "",
        email: "",
        photo: null,
        attachment: [],
        admission_date: new Date("2018-01-01T00:00:00.000Z"),
        heard_from: "",
        reg_number: "",
      });
    }
  };
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
        onSubmit={onSubmit}
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
                  setState({ ...state, image: e.target.files[0] });
                }}
              />
              {imageUrl && image && (
                <Box mt={2} textAlign="center">
                  <img
                    src={imageUrl}
                    alt={image.name}
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
                  <InputLabel htmlFor="outlined-adornment-name">
                    Student Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="Student Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-father_name">
                    Parents / Guardian
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-father_name"
                    label="Parents / Guardian"
                    name="father_name"
                    value={father_name}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-phone_number">
                    Phone Number{" "}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone_number"
                    label="Phone Number"
                    name="phone_number"
                    value={phone_number}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-home_phone">
                    Home Phone{" "}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-home_phone"
                    label="Home Phone"
                    name="home_phone"
                    value={home_phone}
                    onChange={onChange}
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
                  <Select
                    labelId="demo-simple-select-label"
                    id="gender"
                    label="Gender"
                    name="gender"
                    value={gender}
                    onChange={onChange}
                  >
                    <MenuItem value="Male" selected={gender === "Male"}>
                      Male
                    </MenuItem>
                    <MenuItem value="Female" selected={gender === "Female"}>
                      Female
                    </MenuItem>
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
                    value={address}
                    onChange={onChange}
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
                    value={nic}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date Of borth"
                    value={d_o_b}
                    onChange={(newVal) => setState({ ...state, d_o_b: newVal })}
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
                    value={batch}
                    onChange={onChange}
                  >
                    {!loading &&
                      batches.length &&
                      batches.map((batch) => (
                        <MenuItem
                          value={batch._id}
                          // selected={duration_type === "Year"}
                        >
                          {batch.name}-{batch.code}
                        </MenuItem>
                      ))}
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
                    value={email}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="attachments"
                    value={attachment}
                    onChange={onChange}
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
                    value={admission_date}
                    onChange={(newVal) =>
                      setState({ ...state, admission_date: newVal })
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
                  <InputLabel htmlFor="outlined-adornment-heard_from">
                    Heard From
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-heard_from"
                    label="Heard From"
                    name="heard_from"
                    value={heard_from}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-reg_number">
                    Registration Number
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-reg_number"
                    label="Registration Number"
                    name="reg_number"
                    value={reg_number}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={12}>
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.submitBtn}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
            <AAlert />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
  batch: state.batch,
});
export default connect(mapStateToProps, { newStudent, getBatches })(AddStudent);
