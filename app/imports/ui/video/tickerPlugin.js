import _ from 'lodash';
import videojs from 'video.js';

const registerPlugin = videojs.registerPlugin || videojs.plugin;
const Plugin = videojs.getPlugin('plugin');

class tickerPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    // player.on('pause', () => {
    //   options('pause', { time: player.currentTime() });
    // });
    // player.on('play', () => {
    //   options('play', { time: player.currentTime() });
    // });
    player.on('seeking', () => {
      options('seeking', { time: player.currentTime() });
    });
    player.on('timeupdate', _.throttle(() => {
      options('timeupdate', { time: player.currentTime() });
    }, 500));
  }
}

registerPlugin('ticker', tickerPlugin);
