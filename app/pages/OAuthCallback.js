import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import { updateAccessToken as updateAccessTokenAction } from 'Actions';

const OAuthPage = ({
  location,
  updateAccessToken,
}) => {
  const hash = qs.parse(location.hash.slice(1));

  if (hash.access_token) {
    updateAccessToken(hash.access_token);
  }

  return <Redirect to="/" />;
};

OAuthPage.propTypes = {
  location: PropTypes.shape({}),
  updateAccessToken: PropTypes.func.isRequired,
};

OAuthPage.defaultProps = {
  location: {
    hash: '',
  },
};

const mapDispatchToProps = dispatch => ({
  updateAccessToken: token => dispatch(updateAccessTokenAction(token)),
});

export default connect(null, mapDispatchToProps)(OAuthPage);
