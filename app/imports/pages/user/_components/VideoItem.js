import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
// import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

import {
  Row,
  Col,
  Badge,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
} from 'reactstrap';
import Link from 'react-router-dom/Link';

// import styles from './VideoItem.sass';

class VideoItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    channel: PropTypes.shape({}),
    videos: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    channel: {},
    video: {},
  }

  render() {
    const {
      channel, // eslint-disable-line
      video, // eslint-disable-line
    } = this.props;

    // const cardBadgeClasses = classnames('float-right', styles.video__duration);

    const thumbnail =
      (video.thumbnails && video.thumbnails.medium && video.thumbnails.medium[0] &&
        video.thumbnails.medium[0].url) ||
      (video.preview && video.preview.medium) ||
      '';

    const isRecording = video.status === 'recording' ?
      <small className="text-primary">Recording...</small> : null;

    return (
      <Link className="card" to={`./videos/${_.last(video._id.split('v'))}`}>
        <CardImg src={thumbnail} />
        <CardImgOverlay>
          <CardSubtitle>
            <Badge className="float-right" color="light" pill>{moment().startOf('day').seconds(video.length).format('H:mm:ss')}</Badge>
          </CardSubtitle>
        </CardImgOverlay>
        <CardBody>
          <CardSubtitle>
            <small className="text-muted">{video.game}</small>
          </CardSubtitle>
          <CardTitle>{video.title}</CardTitle>
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              <small>{moment(video.published_at).format('LL')}</small>
            </Col>
            <Col className="text-right">{isRecording}</Col>
          </Row>
        </CardFooter>
      </Link>
    );
  }
}

export default pure(VideoItem);
