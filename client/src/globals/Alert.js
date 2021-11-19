import React from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  return alert ? (
    <div className={`alert alert-${alert.type}`}>{alert.message}</div>
  ) : null;
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
