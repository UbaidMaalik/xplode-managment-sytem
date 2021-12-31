import React from "react";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import { Snackbar, Stack } from "@mui/material";

const AAlert = ({ alert }) => {
  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;
  return (
    alert !== null &&
    alert.length > 0 && (
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alert.map((alert) => (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert key={alert.id} severity={alert.type} variant="filled">
              {alert.message}
            </Alert>
          </Snackbar>
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
