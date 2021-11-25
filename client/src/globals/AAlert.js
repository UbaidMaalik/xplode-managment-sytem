import React from "react";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const AAlert = ({ alert }) => {
  return (
    alert !== null &&
    alert.length > 0 && (
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alert.map((alert) => (
          <Alert key={alert.id} severity={alert.type}>
            {alert.message}
          </Alert>
        ))}
      </Stack>
    )
  );
  // return alert ? <Alert severity={alert.type}>{alert.message}</Alert> : null;
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(AAlert);
