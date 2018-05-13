import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import _ from 'lodash';

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
      videosOrder,
    } = this.props;

    // const listItems = _(channels)
    //   .sortBy(channel =>
    //     _.findIndex(channelsOrder, item => item === channel.name))
    //   .map(channel => <MenuItem key={channel.id} channel={channel} />)
    //   .value();

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
        <div className="row m-0 my-1">
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
