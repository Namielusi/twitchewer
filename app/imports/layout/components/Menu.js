/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import _ from 'lodash';

import { LogIn } from 'react-feather';
import NavLink from 'react-router-dom/NavLink';
import MenuItem from './MenuItem';

class Menu extends Component {
  static propTypes = {
    style: PropTypes.object,
    profile: PropTypes.object,
    channels: PropTypes.object,
    channelsOrder: PropTypes.array,
    hideMenu: PropTypes.bool,
  }

  static defaultProps = {
    style: {},
    profile: {},
    channels: {},
    channelsOrder: [],
    hideMenu: false,
  }

  render() {
    const {
      style,
      channels,
      channelsOrder,
      profile,
      hideMenu,
    } = this.props;

    if (hideMenu) {
      return null;
    }

    let profileLink;
    let logoutLink;
    if (!profile.id) {
      const authLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT}&response_type=token&scope=${process.env.API_SCOPE}`;
      profileLink = (
        <NavLink className="list-group-item list-group-item-action" to={authLink} target="_self">
          <div className="media">
            <LogIn className="d-flex mr-3 rounded" style={{ width: 40, height: 40 }} />
            <div className="d-flex flex-column text-truncate" style={{ flexGrow: 1 }}>
              <div className="d-flex text-truncate justify-content-between mb-1">
                <h6 className="text-truncate mb-0">Sigh In</h6>
              </div>
              <small className="d-block text-secondary text-truncate">To sync your subscriptions</small>
            </div>
          </div>
        </NavLink>
      );
    } else {
      profileLink = (
        <NavLink className="list-group-item list-group-item-action" to="/profile">Profile</NavLink>
      );
      logoutLink = (
        <NavLink className="list-group-item list-group-item-action" to="/logout">Log Out</NavLink>
      );
    }

    const listItems = _(channels)
      .sortBy(channel =>
        _.findIndex(channelsOrder, item => item === channel.name))
      .map(channel => <MenuItem key={channel.id} channel={channel} />)
      .value();

    return (
      <div className="col-2 d-none d-xl-flex h-100 p-0 border-right" style={style}>
        <div className="list-group list-group-flush w-100">
          <NavLink className="list-group-item list-group-item-action" to="/" exact>Home</NavLink>
          {profileLink}
          {listItems}
          {logoutLink}
        </div>
      </div>
    );
  }
}

export default pure(Menu);
