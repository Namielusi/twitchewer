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
  }

  static defaultProps = {
    user: {},
    channel: {},
  }

  componentWillMount() {
    const {
      channel,
      fetchVideoList,
    } = this.props;

    if (channel) {
      fetchVideoList(channel.id);
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

const mapStateToProps = ({ root: state }, props) => ({
  user: state.user,
  channel: _.find(state.channels, { name: props.match.params.name }),
});

const mapDispatchToProps = dispatch => ({
  fetchVideoList: channelId => dispatch(videoListAction.request(channelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListPage);
