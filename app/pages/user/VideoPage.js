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

    if (channel && video.id && _.keys(video.sources).length === 0) {
      fetchVideo(video.id, channel.name);
    }
  }

  render() {
    const {
      user,
      channel,
      video,
    } = this.props;

    if (!channel) {
      return <div />;
    }

    let player;
    if (video && _.keys(video.sources).length > 0) {
      const sources = _.reduce(video.sources, (acc, source) => {
        acc.push({ ...source, type: 'application/x-mpegURL' });
        return acc;
      }, []);
      player = <VideoPlayer src={sources} />;
    }

    return (
      <UserLayout channel={channel}>
        {player}
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => ({
  user: state.user,
  channel: state.channels[props.match.params.name],
  video: state.channels[props.match.params.name] && state.channels[props.match.params.name].videos[props.match.params.id],
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: (vodId, channelName) => dispatch(videoAction.request(vodId, channelName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
