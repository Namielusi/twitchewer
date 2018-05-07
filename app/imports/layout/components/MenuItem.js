import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import NavLink from 'react-router-dom/NavLink';

class MenuItem extends Component {
  static propTypes = {
    channel: PropTypes.object,
  }

  static defaultProps = {
    channel: {},
  }

  render() {
    const {
      channel,
    } = this.props;

    const subText = channel.live ?
      channel.streamInfo.game : `Published ${moment(channel.lastPublish).fromNow()}`;

    return (
      <NavLink key={channel.id} className="list-group-item list-group-item-action" to={`/channels/${channel.name}`}>
        <div className="media">
          <img className="d-flex mr-3 rounded" src={channel.logo} style={{ width: 40, height: 40 }} />
          <div className="d-flex flex-column text-truncate" style={{ flexGrow: 1 }}>
            <div className="d-flex text-truncate justify-content-between mb-1">
              <h6 className="text-truncate mb-0">{channel.displayName}</h6>
              {channel.live && <small className="badge badge-pill badge-danger ml-2">{channel.streamInfo.viewers}</small>}
            </div>
            <small className="d-block text-secondary text-truncate">{subText}</small>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default MenuItem;
