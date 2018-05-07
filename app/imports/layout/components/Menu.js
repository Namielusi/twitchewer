/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import _ from 'lodash';

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
      hideMenu,
    } = this.props;

    if (hideMenu) {
      return null;
    }

    /*
    const listItems = _(channels)
      .filter(channel => channel.followed)
      .orderBy(['live', 'streamInfo.viewers', 'subscribed', 'lastPublish'],
        ['desc', 'desc', 'desc', 'desc'])
      .map(channel => <MenuItem key={channel.id} channel={channel} />)
      .value();
    */
    const listItems = _(channels)
      .sortBy(channel =>
        _.findIndex(channelsOrder, item => item === channel.name))
      .map(channel => <MenuItem key={channel.id} channel={channel} />)
      .value();
    // sorted = _.sortBy(items1, x => _.findIndex(items2, y => x.id === y.id))

    return (
      <div className="col-2 d-none d-xl-flex h-100 p-0 border-right" style={style}>
        <div className="list-group list-group-flush w-100">
          <NavLink className="list-group-item list-group-item-action" to="/" exact>Home</NavLink>
          <NavLink className="list-group-item list-group-item-action" to="/profile">Profile</NavLink>
          {listItems}
        </div>
      </div>
    );
  }
}

export default pure(Menu);
