import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import moment from 'moment';
import _ from 'lodash';

// import {
//   Row,
//   Col,
//   Badge,
//   CardImg,
//   CardImgOverlay,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   CardFooter,
// } from 'reactstrap';
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
      channel,
      video,
    } = this.props;

    return (
      <Link className="card" to={`./videos/${video.id}`}>
        <img className="card-img" src={video.preview} />
        <div className="card-img-overlay">
          <div className="card-subtitle">
            <div className="badge badge-pill badge-light float-right ">
              {moment().startOf('day').seconds(video.length).format('H:mm:ss')}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="card-subtitle">
            <small className="text-muted">{video.game}</small>
          </div>
          <div className="card-title">{video.title}</div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <small>{moment(video.publishedAt).format('LL')}</small>
            </div>
            <div className="col text-right">
              {video.status === 'recording' ? <small className="text-primary">Recording...</small> : null}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default pure(VideoItem);
