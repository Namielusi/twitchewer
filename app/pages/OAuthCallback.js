import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import { updateAccessToken } from 'Actions';

const OAuthPage = ({
  location,
  setAccessToken,
}) => {
  const hash = qs.parse(location.hash.slice(1));

  if (hash.access_token) {
    setAccessToken(hash.access_token);
  }

  return <Redirect to="/" />;
};

OAuthPage.propTypes = {
  location: PropTypes.shape({}),
  setAccessToken: PropTypes.func.isRequired,
};

OAuthPage.defaultProps = {
  location: {
    hash: '',
  },
};

const mapDispatchToProps = dispatch => ({
  setAccessToken: token => dispatch(updateAccessToken(token)),
});

export default connect(null, mapDispatchToProps)(OAuthPage);
