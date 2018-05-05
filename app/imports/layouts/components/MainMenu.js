/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

import { Row, Col, ListGroup, Card } from 'reactstrap';
import { LogIn, Star } from 'react-feather';

// import styles from './MainMenu.sass';
import itemStyles from './MainMenuItem.sass';

import MainMenuItem from './MainMenuItem';

class MainMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    className: '',
    user: {},
    channels: [],
  }

  render() {
    const {
      className,
      user,
      channels,
    } = this.props;

    let profileItem;
    if (user.id) {
      profileItem = (
        <MainMenuItem
          className={itemStyles.item_profile}
          img={user.logo}
          title={user.displayName}
          description="Go to your profile"
          url="/profile"
        />
      );
    } else {
      const authIcon = <LogIn />;
      const authLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT}&response_type=token&scope=${process.env.API_SCOPE}`;
      profileItem = (
        <MainMenuItem
          img={authIcon}
          title="Sign In"
          description="To sync your subscriptions"
          url={authLink}
          external
        />
      );
    }

    const channelListItems = _(channels)
      .orderBy(['live', 'streamInfo.viewers', 'subscribed', 'lastPublish'], ['desc', 'desc', 'desc', 'desc'])
      .map((channel) => {
        const classes = classnames({
          [itemStyles.item_streaming]: channel.live,
        });
        const smallClasses = classnames({
          'text-muted': !channel.live,
          'text-red': channel.live,
        });
        const title = (
          <span>
            {channel.displayName}
            { channel.subscribed && <Star className={itemStyles.item__subscribedIcon} /> }
          </span>
        );
        const description = channel.live ?
          `Is streaming now — ${channel.streamInfo.viewers}` :
          `Published ${moment(channel.lastPublish).fromNow()}`;
        const url = channel.live ?
          `/user/${channel.name}` :
          `/user/${channel.name}/videos`;

        return (
            <MainMenuItem
              key={channel.id}
              className={classes}
              smallClassName={smallClasses}
              img={channel.logo}
              title={title}
              description={description}
              url={url}
            />
        );
      })
      .value();

    return (
      <Card className={className}>
        <ListGroup flush={true}>
          {profileItem}
          {channelListItems}
        </ListGroup>
      </Card>
    );
  }
}

export default pure(MainMenu);
