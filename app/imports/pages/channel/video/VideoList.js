import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import _ from 'lodash';

import VideoItem from './VideoItem';

class VideoList extends Component {
  static propTypes = {
    className: PropTypes.string,
    channel: PropTypes.shape({}),
    videos: PropTypes.shape({}),
    videosOrder: PropTypes.shape([]),
  }

  static defaultProps = {
    className: '',
    channel: {},
    videos: {},
    videosOrder: [],
  }

  render() {
    const {
      channel,
      videos,
      videosOrder,
    } = this.props;

    const videoList = _(videos)
      .sortBy(video =>
        _.findIndex(videosOrder, item => item === video.id))
      .reduce((acc, video) => {
        acc.push(<VideoItem key={video.id} channel={channel} video={video} />);
        return acc;
      }, []);
    const chunkedList = _(videoList)
      .chunk(4)
      .map(chunk => (
        <div key={chunk[0].key} className="row m-0 my-1">
          <div className="card-deck my-2">{chunk}</div>
        </div>
      ))
      .value();

    return (
      <div className="container-fluid w-100 h-100 overflow-y-auto overflow-x-hidden">
        {chunkedList}
      </div>
    );
  }
}

export default pure(VideoList);
