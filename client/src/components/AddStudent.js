import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddStudent = () => {
  return (
    <div>
      <form>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="stdName" label="Student Name" variant="outlined" />
            <TextField
              id="parents"
              label="Parents / Guardian"
              variant="outlined"
            />
          </div>
          <div>
            <TextField id="stdName" label="Student Name" variant="outlined" />
            <TextField
              id="parents"
              label="Parents / Guardian"
              variant="outlined"
            />
          </div>
          <div>
            <TextField id="stdName" label="Student Name" variant="outlined" />
            <TextField
              id="parents"
              label="Parents / Guardian"
              variant="outlined"
            />
          </div>
        </Box>
      </form>
    </div>
  );
};

export default AddStudent;
