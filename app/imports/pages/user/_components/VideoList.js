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
    videos: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    channel: {},
    videos: {},
  }

  render() {
    const {
      channel,
      videos,
    } = this.props;

    const videoList = _(videos)
      .reduce((acc, video) => {
        acc.push(<VideoItem key={video.id} channel={channel} video={video} />);
        return acc;
      }, []);
    const chunkedList = _(videoList)
      .chunk(4)
      .map(chunk => (
        <Row className="m-0">
          <CardDeck className="mb-4">
            {chunk}
          </CardDeck>
        </Row>
      ));

    return (
      <Container className="p-4" fluid={true}>{chunkedList.value()}</Container>
    );
  }
}

export default pure(VideoList);
