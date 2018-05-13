import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { liveSource as liveSourceAction } from 'Actions';

import Layout from 'Layout/Layout';
import Body from 'Layout/Body';
import SideBar from 'Layout/SideBar';
import ChannelTopNav from 'Imports/pages/channel/ChannelTopNav';
import ChannelChat from 'Imports/pages/channel/ChannelChat';
import Loading from 'Imports/ui/Loading';
import VideoPlayer from 'Imports/ui/VideoPlayer';

class LiveStreamPage extends Component {
  static propTypes = {
    channel: PropTypes.object,
  }

  static defaultProps = {
    channel: {},
  }

  constructor(props) {
    super(props);

    props.fetchLiveSource(props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      fetchLiveSource,
    } = this.props;

    if (match.params.name !== prevProps.match.params.name) {
      fetchLiveSource(match.params.name);
    }
  }

  render() {
    const {
      channel,
      sources,
    } = this.props;

    const sourcesEx = _.reduce(sources, (acc, value) => ([ ...acc, value ]), []);

    console.log('[RENDER]', channel.name, channel, sources, sourcesEx);

    let body = channel.live ? <Loading /> : <Loading text="Offline" />;
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
  sources: state.channels[props.match.params.name] ?
    state.channels[props.match.params.name].streamInfo.sources : {},
});

const mapDispatchToProps = dispatch => ({
  fetchLiveSource: channelName => dispatch(liveSourceAction.request(channelName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamPage);
