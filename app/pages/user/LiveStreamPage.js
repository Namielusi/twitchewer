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

class LiveStreamPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channel: PropTypes.shape({}),
  }

  static defaultProps = {
    user: {},
    channel: {},
  }

  componentWillMount() {
    const {
      channel,
      fetchSources,
    } = this.props;

    if (channel && channel.live) {
      fetchSources(channel.name);
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

    let player;
    if (channel.streamInfo && channel.streamInfo.sources) {
      const sources = _.reduce(channel.streamInfo.sources || {}, (acc, value, key) => {
        acc.push({
          ...value,
          type: 'application/x-mpegURL',
        });
        return acc;
      }, []);

      console.log(sources);

      player = <VideoPlayer className="w-100 h-75" src={sources} />;
    }

    return (
      <UserLayout channel={channel}>
        <Col className="h-100">
          <Row className="h-75">{player}</Row>
          <Row>Bottom</Row>
        </Col>
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => ({
  user: state.user,
  channel: state.channels[props.match.params.name],
});

const mapDispatchToProps = dispatch => ({
  fetchSources: channelName => dispatch(streamSourcesAction.request(channelName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamPage);
