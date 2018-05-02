/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Parser } from 'm3u8-parser';
import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';

import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';
import Link from 'react-router-dom/Link';

import api from 'Lib/api';
import { video as videoAction } from 'Actions';

import UserLayout from '../../imports/pages/user/UserLayout';
import VideoPlayer from '../../imports/ui/VideoPlayer';

class VideoPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channel: PropTypes.shape({}),
    video: PropTypes.shape({}),
  }

  static defaultProps = {
    user: {},
    channel: {},
    video: {},
  }

  async componentWillMount() {
    const {
      channel,
      video,
      fetchVideo,
    } = this.props;

    if (channel) {
      fetchVideo(channel.name, video.id);

      // const { data: liveTokens } = await api('get', `/proxy/api/vods/${computedMatch.params.id}/access_token`, {
      //   accessToken: 'nqq61e77vjykafyhxnf6nutao9y2h5',
      // });
      //
      // const res = await axios({
      //   method: 'GET',
      //   url: `/proxy/usher/vod/${computedMatch.params.id}`,
      //   params: {
      //     // player: 'twitchweb',
      //     nauth: liveTokens.token,
      //     nauthsig: liveTokens.sig,
      //     // allow_audio_only: true,
      //     // allow_source: true,
      //     // type: 'any',
      //     // p: _.random(100000, 999999),
      //   },
      //   headers: {
      //     'Content-type': 'application/vnd.apple.mpegurl',
      //   }
      // });
      //
      // const parser = new Parser();
      //
      // parser.push(res.data);
      // parser.end();
      //
      // console.log(parser);
      //
      // const sources = [];
      // parser.manifest.playlists.map((source) => {
      //   const { attributes, uri } = source;
      //
      //   if (attributes.VIDEO === 'audio_only') { return; }
      //   sources.push({
      //     src: `/proxy/video?url=${uri}`,
      //     resolution: attributes.RESOLUTION,
      //     label: attributes.VIDEO === 'chunked' ? 'source' : attributes.VIDEO,
      //   });
      // });
      //
      // console.log(sources);
      //
      // this.setState({
      //   sources: sources,
      // });
    }
  }

  render() {
    const {
      sources,
    } = this.state;
    const {
      user,
      channel,
      video,
    } = this.props;

    if (!channel) {
      return <div />;
    }

    // let player;
    // if (sources) {
    //   player = <VideoPlayer src={sources.map(item => ({ ...item, type: 'application/x-mpegURL' }))} />;
    // }

    return (
      <UserLayout channel={channel}>
        Body
        {/* {player} */}
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => {
  const channel = _.find(state.channels, { name: props.match.params.name });

  return {
    user: state.user,
    channel,
    video: _.find(channel, { id: props.match.params.id }),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchVideo: (channelName, vodId) => dispatch(videoAction.request(channelName, vodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
