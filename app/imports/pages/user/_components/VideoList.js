/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import classnames from 'classnames';
import _ from 'lodash';

import {
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from 'reactstrap';
import Link from 'react-router-dom/Link';

// import styles from './VideoList.sass';

import VideoItem from './VideoItem';

class VideoList extends Component {
  static propTypes = {
    className: PropTypes.string,
    channel: PropTypes.shape({}),
    videos: PropTypes.array,
  }

  static defaultProps = {
    className: '',
    channel: {},
    videos: [],
  }

  render() {
    const {
      channel,
      videos,
    } = this.props;

    // const classes = classnames('list-group-item', 'rounded-0', className);

    const videoItems = _(videos)
      .map(video => <VideoItem key={video._id} channel={channel} video={video} />)
      .chunk(4)
      .map(chunk => (
        <Row className="m-0">
          <CardDeck className="mb-4">
            {chunk}
          </CardDeck>
        </Row>
      ));

    return (
      <Container className="p-4" fluid={true}>{videoItems.value()}</Container>
    );
  }
}

export default pure(VideoList);
