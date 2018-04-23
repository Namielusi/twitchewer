import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import NProgress from 'nprogress';
import classnames from 'classnames';
import _ from 'lodash';

import api from 'Lib/api';

import {
  updateLoadingAction,
  updateUserInfoAction,
  updateChannelListAction,
} from 'Actions';
import 'nprogress/nprogress.css';
import styles from './Layout.sass';

import Loading from './components/Loading';
import MainMenu from './components/MainMenu';

class Layout extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    accessToken: PropTypes.string,
    user: PropTypes.shape({}),
    channels: PropTypes.array,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    loading: false,
    accessToken: null,
    user: {},
    channels: [],
  }

  constructor() {
    super();

    this.fetchData = this.fetchData.bind(this);
  }

  async componentWillMount() {
    NProgress.start();
    await this.fetchData();
    if (this.props.children.fetchData) {
      await this.props.children.fetchData();
    }
    NProgress.done();
  }

  async fetchData() {
    const {
      user,
      accessToken,
      updateLoading,
      updateUserInfo,
      updateChannelList,
    } = this.props;

    if (!accessToken || user.id) { return; }

    updateLoading(true);

    const { data: userData } = await api('get', 'https://api.twitch.tv/kraken/user')(accessToken);
    const { data: followsData } = await api('get', `https://api.twitch.tv/kraken/users/${userData._id}/follows/channels`)(accessToken);

    const channels = [];

    await Promise.all(_.map(followsData.follows, async ({ channel }) => {
      let subscribed;

      // Check is user subscribed to this channel
      try {
        await api('get', `https://api.twitch.tv/kraken/users/${userData._id}/subscriptions/${channel._id}`)(accessToken);
        subscribed = true;
      } catch (e) {
        subscribed = false;
      }

      const { data: { videos: [lastVideoData] } } = await api('get', `https://api.twitch.tv/kraken/channels/${channel._id}/videos?limit=1`)(accessToken);

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

    updateLoading(false);
  }

  render() {
    const {
      loading,
      user,
      channels,
      children,
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    const containerClasses = classnames(styles.container, 'h-100');

    return (
      <Container className={containerClasses} fluid={true}>
        <Row className="h-100" noGutters={true}>
          <Col className={styles.leftBar} xs="2">
            <MainMenu className="h-100 rounded-0 border-left-0 border-top-0 border-bottom-0" user={user} channels={channels} />
          </Col>
          <Col className={styles.body}>{children}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ root: state }) => ({
  loading: state.loading,
  accessToken: state.accessToken,
  user: state.user,
  channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  updateLoading: data => dispatch(updateLoadingAction(data)),
  updateUserInfo: data => dispatch(updateUserInfoAction(data)),
  updateChannelList: data => dispatch(updateChannelListAction(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
