import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  video as videoAction,
  recordSource as recordSourceAction,
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
    channel: PropTypes.object,
  }

  static defaultProps = {
    channel: {},
  }

  constructor(props) {
    super(props);

    const { name, id } = props.match.params;
    props.fetchVideo(name, id);
    props.fetchRecordSource(name, id);
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     match,
  //     fetchRecordSource,
  //   } = this.props;
  //
  //   const { name, id } = match.params;
  //
  //   if (match.params.id !== prevProps.match.params.id) {
  //     fetchRecordSource(name, id);
  //   }
  // }

  render() {
    const {
      channel,
      sources,
    } = this.props;

    const sourcesEx = _.reduce(sources, (acc, value) => ([...acc, value]), []);

    let body = <Loading />;
    if (sourcesEx.length > 0) {
      body = <VideoPlayer src={sourcesEx} />;
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
            {body}
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
  video: _.get(state, `channels.${props.match.params.name}.videos.${props.match.params.id}`, {}),
  sources: _.get(state, `channels.${props.match.params.name}.videos.${props.match.params.id}.sources`, {}),
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: (channelName, videoId) => dispatch(videoAction.request(channelName, videoId)),
  fetchRecordSource: (channelName, videoId) =>
    dispatch(recordSourceAction.request(channelName, videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
