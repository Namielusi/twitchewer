import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { videoList as videoListAction } from 'Actions';

import Layout from 'Layout/Layout';
import Body from 'Layout/Body';
import SideBar from 'Layout/SideBar';
import ChannelTopNav from 'Imports/pages/channel/ChannelTopNav';
import ChannelChat from 'Imports/pages/channel/ChannelChat';
import VideoList from 'Imports/pages/channel/video/VideoList';

class VideoListPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    channel: PropTypes.object,
    videos: PropTypes.object,
    videosOrder: PropTypes.array,
    fetchVideoList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    channel: {},
    videos: {},
    videosOrder: [],
  }

  constructor(props) {
    super(props);

    props.fetchVideoList(props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      fetchVideoList,
    } = this.props;

    if (match.params.name !== prevProps.match.params.name) {
      fetchVideoList(match.params.name);
    }
  }

  render() {
    const {
      channel,
      videos,
      videosOrder,
    } = this.props;

    return (
      <Layout>
        <Body>
          <div className="d-flex flex-column h-100">
            <ChannelTopNav
              logo={channel.logo}
              name={channel.name}
              displayName={channel.displayName}
            />
            <VideoList channel={channel} videos={videos} videosOrder={videosOrder} />
          </div>
        </Body>
        <SideBar>
          <ChannelChat />
        </SideBar>
      </Layout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => ({
  channel: state.channels[props.match.params.name],
  videos: state.channels[props.match.params.name] ?
    state.channels[props.match.params.name].videos : {},
  videosOrder: state.channels[props.match.params.name] ?
    state.channels[props.match.params.name].videosOrder : {},
});

const mapDispatchToProps = dispatch => ({
  fetchVideoList: channelName => dispatch(videoListAction.request(channelName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListPage);
