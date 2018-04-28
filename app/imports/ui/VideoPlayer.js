import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import videojsQualitySelector from 'silvermine-videojs-quality-selector';
import 'videojs-contrib-hls';

import 'video.js/dist/video-js.css';

videojsQualitySelector(videojs);

export default class VideoPlayer extends Component {
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.shape,
      PropTypes.array,
    ]).isRequired,
  }

  componentDidMount() {
    const options = {
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

    this.player = videojs(this.videoNode, options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });

    this.player.src(this.props.src);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={(node) => { this.videoNode = node; }} className="video-js vjs-default-skin" width="1000" height="500" preload="auto" data-setup='{}'></video>
        </div>
      </div>
    );
  }
}
