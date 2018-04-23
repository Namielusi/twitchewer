/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,

  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import { LogIn } from 'react-feather';
import { pure } from 'recompose';
import moment from 'moment';
import classnames from 'classnames';

import styles from './MainMenu.sass';

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
      const profileLink = `/user/${user.name}`;
      profileItem = (
        <MainMenuItem
          img={user.logo}
          title={user.displayName}
          description="Go to your profile"
          url={profileLink}
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

    const channelListItems = channels.map(channel => (
        <MainMenuItem
          key={channel.id}
          img={channel.logo}
          title={channel.displayName}
          description={`Published ${moment((channel.videos[0] || {}).published_at).fromNow()}`}
          url={`/user/${channel.name}`}
        />
    ));

    return (
      <Card className={className}>
        <ListGroup flush={true}>
          {profileItem}
          {channelListItems}
        </ListGroup>
      </Card>
    )
  }
}

export default pure(MainMenu);
