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

import { videos as videosAction } from 'Actions';

import UserLayout from '../../imports/pages/user/UserLayout';
import VideoList from '../../imports/pages/user/_components/VideoList';

class VideoListPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    user: {},
    channels: {},
  }

  static async fetchData(location, store) {

  }

  componentWillMount() {
    const {
      channels,
      computedMatch,
      fetchVideos,
    } = this.props;
    const channel = _.find(channels, { name: computedMatch.params.name });

    if (channel) {
      fetchVideos(channel.id);
    }
  }

  render() {
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
        <VideoList channel={channel} videos={channel.videos} />
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
