import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';

const ChannelTopNav = ({ logo, name, displayName }) => (
  <nav className="navbar navbar-expand border-bottom navbar-light bg-light" style={{ overflowX: 'auto' }}>
    <Link className="navbar-brand" to={`/channels/${name}/info`}>
      <img className="d-inline-block rounded align-top mr-2" src={logo} width="30" height="30" alt="Channel logo" />
      {displayName}
    </Link>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to={`/channels/${name}`} exact>Live</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`/channels/${name}/videos`}>Videos</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link disabled" to="#">Clips</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link disabled" to="#">Followers</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link disabled" to="#">Followed</NavLink>
      </li>
    </ul>
  </nav>
);

ChannelTopNav.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  displayName: PropTypes.string,
};

ChannelTopNav.defaultProps = {
  logo: '',
  name: '',
  displayName: '',
};

export default pure(ChannelTopNav);
