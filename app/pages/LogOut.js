import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logOut as logOutAction } from 'Actions';

const LogOutPage = ({ logOut }) => {
  logOut();
  return <Redirect to="/" />;
};

LogOutPage.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut: token => dispatch(logOutAction(token)),
});

export default connect(null, mapDispatchToProps)(LogOutPage);
