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
import { videos as videosAction } from 'Actions';

import UserLayout from '../../imports/pages/user/UserLayout';
import VideoPlayer from '../../imports/ui/VideoPlayer';

class VideoListPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    user: {},
    channels: {},
  }

  constructor() {
    super();

    this.state = {
      token: null,
      sid: null,
    }
  }

  async componentWillMount() {
    const {
      channels,
      computedMatch,
      fetchVideos,
    } = this.props;
    const channel = _.find(channels, { name: computedMatch.params.name });

    if (channel) {
      fetchVideos(channel.id);

      if (channel.streaming) {
        const { data: liveTokens } = await api('get', `/proxy/api/channels/${channel.name}/access_token`, {
          accessToken: 'nqq61e77vjykafyhxnf6nutao9y2h5',
        });

        const res = await axios({
          method: 'GET',
          url: `/proxy/usher/api/channel/hls/${channel.name}.m3u8`,
          params: {
            player: 'twitchweb',
            token: liveTokens.token,
            sig: liveTokens.sig,
            allow_audio_only: true,
            allow_source: true,
            type: 'any',
            p: _.random(100000, 999999),
          },
          headers: {
            'Content-type': 'application/vnd.apple.mpegurl',
          }
        });

        const parser = new Parser();

        parser.push(res.data);
        parser.end();

        const sources = [];
        parser.manifest.playlists.map((source) => {
          const { attributes, uri } = source;

          if (attributes.VIDEO === 'audio_only') { return; }
          sources.push({
            src: uri,
            resolution: attributes.RESOLUTION,
            label: attributes.VIDEO === 'chunked' ? 'source' : attributes.VIDEO,
          });
        });

        // console.log(sources);

        this.setState({
          sources: sources,
        });
      }
    }
  }

  render() {
    const {
      sources,
    } = this.state;
    const {
      user,
      channels,
      computedMatch,
      fetchVideos,
    } = this.props;

    const name = computedMatch.params.name;
    const channel = _.find(channels, { name: computedMatch.params.name });

    if (!channel) {
      return <div />;
    }

    let player;
    if (sources) {
      player = <VideoPlayer src={sources.map(item => ({ ...item, type: 'application/x-mpegURL' }))} />;
    }

    return (
      <UserLayout channel={channel}>
        {player}
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ root: state }) => ({
  user: state.user,
  channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: channelId => dispatch(videosAction.request(channelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListPage);
