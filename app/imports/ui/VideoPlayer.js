import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import videojs from 'video.js';
// import '@videojs/http-streaming';
import videojsQualitySelector from 'silvermine-videojs-quality-selector';
// import 'videojs-contrib-hls';

import 'video.js/dist/video-js.css';
import './video/tickerPlugin';

videojsQualitySelector(videojs);

class VideoPlayer extends Component {
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.shape,
      PropTypes.array,
    ]).isRequired,
    ticker: PropTypes.func,
  }

  static defaultProps = {
    ticker: () => {},
  }

  componentDidMount() {
    const options = {
      html5: {
        hls: {
          withCredentials: true,
        },
      },
      controls: true,
      controlBar: {
        children: [
          'playToggle',
          'progressControl',
          'volumePanel',
          'qualitySelector',
          'fullscreenToggle',
        ],
      },
    };

    this.player = videojs(this.videoNode, options, () => {
      // onPlayerReady
      // console.log('onPlayerReady', this);
    });

    this.player.ticker(this.props.ticker);

    this.player.src(this.props.src);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.src, nextProps.src);
  }

  componentDidUpdate() {
    const { src } = this.props;

    this.player.src(src);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className="w-100 h-100">
        <div data-vjs-player>
          <video ref={(node) => { this.videoNode = node; }} className="video-js vjs-default-skin w-100 h-100" preload="auto" data-setup='{}'></video>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
