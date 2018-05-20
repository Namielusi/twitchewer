import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
  video as videoAction,
  recordSource as recordSourceAction,
  recordChat as recordChatAction,
} from 'Actions';

import Layout from 'Layout/Layout';
import Body from 'Layout/Body';
import SideBar from 'Layout/SideBar';
import ChannelTopNav from 'Imports/pages/channel/ChannelTopNav';
import ChannelChat from 'Imports/pages/channel/ChannelChat';
import Loading from 'Imports/ui/Loading';
import VideoPlayer from 'Imports/ui/VideoPlayer';

class VideoPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    channel: PropTypes.object,
    video: PropTypes.object,
    sources: PropTypes.object,
    fetchVideo: PropTypes.func.isRequired,
    fetchRecordSource: PropTypes.func.isRequired,
  }

  static defaultProps = {
    channel: {},
    video: {},
    sources: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      time: 0,
    };

    const { name, id } = props.match.params;
    props.fetchVideo(name, id);
    props.fetchRecordSource(name, id);
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      fetchVideo,
      fetchRecordSource,
    } = this.props;

    const { name, id } = match.params;

    if (match.params.id !== prevProps.match.params.id) {
      fetchVideo(name, id);
      fetchRecordSource(name, id);
    }
  }

  render() {
    const { time } = this.state;
    const {
      match,
      channel,
      video,
      sources,
      chat,
      fetchRecordChat,
    } = this.props;

    const sourcesEx = _.reduce(sources, (acc, value) => ([...acc, value]), []);
    const tickerThrottle = _.throttle((data) => {
      fetchRecordChat(match.params.name, match.params.id, { content_offset_seconds: data.time });
    }, 80 * 1000);
    const ticker = (event, data) => {
      if (event === 'seeking') {
        fetchRecordChat(match.params.name, match.params.id, {
          content_offset_seconds: Math.max(data.time - 40, 0),
        });
      }
      tickerThrottle(data);
      this.setState({ time: data.time });
    };

    let body = <Loading />;
    if (sourcesEx.length > 0) {
      body = <VideoPlayer src={sourcesEx} ticker={ticker} />;
    }

    return (
      <Layout>
        <Body>
          <div className="d-flex flex-column h-100">
            <ChannelTopNav
              logo={channel.logo}
              name={channel.name}
              displayName={channel.displayName}
            />
            <div className="card d-lg-none border-bottom-1">
              <div className="card-body pl-3 pr-3 pt-1 pb-1">
                <h6 className="card-title m-0">{video.title}</h6>
              </div>
            </div>
            {body}
            <div className="card d-none d-lg-flex border-top-1">
              <div className="card-body">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="card-title m-0">{video.title}</h5>
                  <small className="text-muted">3 days ago</small>
                </div>
                <small className="card-subtitle text-muted">{video.game}</small>
              </div>
            </div>
          </div>
        </Body>
        <SideBar>
          <ChannelChat
            channelName={match.params.name}
            videoId={match.params.id}
            time={time}
            chat={chat}
            fetchRecordChat={fetchRecordChat}
          />
        </SideBar>
      </Layout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => ({
  channel: state.channels[props.match.params.name],
  video: _.get(state, `channels.${props.match.params.name}.videos.${props.match.params.id}`, {}),
  sources: _.get(state, `channels.${props.match.params.name}.videos.${props.match.params.id}.sources`, {}),
  chat: _.get(state, `channels.${props.match.params.name}.videos.${props.match.params.id}.chat`, {}),
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: (channelName, videoId) => dispatch(videoAction.request(channelName, videoId)),
  fetchRecordSource: (channelName, videoId) =>
    dispatch(recordSourceAction.request(channelName, videoId)),
  fetchRecordChat: (channelName, videoId, data) =>
    dispatch(recordChatAction.request(channelName, videoId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
