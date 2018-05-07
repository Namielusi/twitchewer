/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

import { videoList as videoListAction } from 'Actions';

import UserLayout from '../../imports/pages/user/UserLayout';
import VideoList from '../../imports/pages/user/_components/VideoList';

class VideoListPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channel: PropTypes.shape({}),
    videos: PropTypes.shape({}),
  }

  static defaultProps = {
    user: {},
    channel: {},
    videos: {},
  }

  componentWillMount() {
    const {
      channel,
      fetchVideoList,
    } = this.props;

    if (channel && _.keys(channel.videos).length < 16) {
      fetchVideoList(channel.id, channel.name, 1);
    }
  }

  render() {
    const {
      user,
      channel,
      videos,
    } = this.props;

    if (!channel) {
      return <div />;
    }

    return (
      <UserLayout channel={channel}>
        <Pagination className="justify-content-center mt-3">
          <PaginationItem disabled>
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink href="1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
        </Pagination>
        <VideoList channel={channel} videos={videos} />
      </UserLayout>
    );
  }
}

const mapStateToProps = ({ root: state }, props) => ({
  user: state.user,
  channel: state.channels[props.match.params.name],
  videos: (state.channels[props.match.params.name] || {}).videos || {},
});

const mapDispatchToProps = dispatch => ({
  fetchVideoList: (channelId, channelName, page) => dispatch(videoListAction.request(channelId, channelName, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListPage);
