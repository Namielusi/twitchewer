import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import _ from 'lodash';

// import { updateUserInfoAction } from '../actions';
// import { stream as streamAction } from 'Actions';

import Layout from 'Layout/Layout';
import Body from 'Layout/Body';
import SideBar from 'Layout/SideBar';
import ChannelTopNav from 'Imports/pages/channel/ChannelTopNav';
import ChannelChat from 'Imports/pages/channel/ChannelChat';

class VideoListPage extends Component {
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

    return (
      <Layout>
        <Body>
          <ChannelTopNav
            logo={channel.logo}
            name={channel.name}
            displayName={channel.displayName}
          />
          VideoListPage
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
});

// const mapDispatchToProps = dispatch => ({
//   fetchStream: channelName => dispatch(streamAction.request(channelName)),
// });

export default connect(mapStateToProps, null)(VideoListPage);
