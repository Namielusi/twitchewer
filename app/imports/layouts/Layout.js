import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { pure } from 'recompose';
import axios from 'axios';
import _ from 'lodash';

import {
  updateUserInfoAction,
  updateChannelListAction,
} from '../../actions';
import styles from './Layout.sass';

import MainMenu from './components/MainMenu';

class Layout extends Component {
  static propTypes = {
    accessToken: PropTypes.string,
    user: PropTypes.shape({}),
    channels: PropTypes.array,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    accessToken: null,
    user: {},
    channels: [],
  }

  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async componentWillMount() {
    this.setState({ loading: true });

    await this.fetchData();
    if (this.props.children.fetchData) {
      await this.props.children.fetchData();
    }

    this.setState({ loading: false });
  }

  async fetchData() {
    const {
      accessToken,
      updateUserInfo,
      updateChannelList,
    } = this.props;

    if (!accessToken) { return; }

    const { data: userData } = await axios.get('https://api.twitch.tv/kraken/user', {
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${accessToken}`,
        'Client-ID': process.env.CLIENT_ID,
      },
    });

    const { data: followsData } = await axios.get(`https://api.twitch.tv/kraken/users/${userData._id}/follows/channels`, {
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${accessToken}`,
        'Client-ID': process.env.CLIENT_ID,
      },
    });

    const channels = [];

    await Promise.all(_.map(followsData.follows, async ({ channel }) => {
      let subscribed;

      // Check is user subscribed to this channel
      try {
        await axios.get(`https://api.twitch.tv/kraken/users/${userData._id}/subscriptions/${channel._id}`, {
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            Authorization: `OAuth ${accessToken}`,
            'Client-ID': process.env.CLIENT_ID,
          },
        });
        subscribed = true;
      } catch (e) {
        subscribed = false;
      }

      const { data: { videos: [lastVideoData] } } = await axios.get(`https://api.twitch.tv/kraken/channels/${channel._id}/videos?limit=1`, {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `OAuth ${accessToken}`,
          'Client-ID': process.env.CLIENT_ID,
        },
      });

      channels.push({
        id: channel._id,
        name: channel.name,
        displayName: channel.display_name,
        logo: channel.logo,
        banner: channel.profile_banner,
        subscribed,
        lastActive: channel.updated_at,
        videos: [
          {
            id: lastVideoData.broadcast_id,
            title: lastVideoData.title,
            type: lastVideoData.broadcast_type,
            status: lastVideoData.status,
            resolutions: lastVideoData.resolutions,
            fps: lastVideoData.fps,
            previews: lastVideoData.preview,
            created_at: lastVideoData.created_at,
            published_at: lastVideoData.published_at,
          },
        ],
      });
    }));

    const sortedChannels = channels.sort((prev, next) =>
      new Date((next.videos[0] || {}).published_at || 0) -
      new Date((prev.videos[0] || {}).published_at || 0));

    updateUserInfo({
      id: userData._id,
      name: userData.name,
      displayName: userData.display_name,
      logo: userData.logo,
    });
    updateChannelList(sortedChannels);
  }

  render() {
    const { loading } = this.state;
    const {
      user,
      channels,
      children,
    } = this.props;

    const renderLoading = (
      <div>Loading. Please, wait.</div>
    );

    if (loading) {
      return renderLoading;
    }

    return (
      <div className={styles.wrapper}>
        <MainMenu user={user} channels={channels} />
        <div className={styles.container}>{children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.access_token,
  user: state.user,
  channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: data => dispatch(updateUserInfoAction(data)),
  updateChannelList: data => dispatch(updateChannelListAction(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
