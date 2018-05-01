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
import { streamSources as streamSourcesAction } from 'Actions';

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

    // this.state = {
    //   token: null,
    //   sid: null,
    // }
  }

  componentWillMount() {
    const {
      match,
      channel,
      fetchSources,
    } = this.props;

    if (channel && channel.streaming) {
      fetchSources(match.params.name);
    }
  }

  render() {
    const {
      user,
      channel,
    } = this.props;

    if (!channel) {
      return <div />;
    }

    // const sources = (channel.streamInfo.sources || [])
    //   .map(item => ({ ...item, type: 'application/x-mpegURL' }));

    return (
      <UserLayout channel={channel}>
        {/* <VideoPlayer src={sources} /> */}
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => ({
  user: state.user,
  channel: _.find(state.channels, { name: props.match.params.name }),
});

const mapDispatchToProps = dispatch => ({
  fetchSources: channelName => dispatch(streamSourcesAction.request(channelName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListPage);
