import _ from 'lodash';
import NProgress from 'nprogress';
import * as ActionType from '../actions';

const merge = (path, ...obj) =>
  _.merge(..._.map(obj, item => _.get(item, path)));

const initialState = {
  loading: [],
  accessToken: null,
  profile: {
    id: null,
    name: null,
    displayName: null,
  },
  channels: {},
  channelsOrder: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.START_LOADING: {
      const { name } = action.payload;
      const newState = _.cloneDeep(state);
      const loading = _.union(newState.loading, [name]);
      if (newState.loading.length === 0) {
        NProgress.start();
      }

      return {
        ...state,
        loading,
      };
    }
    case ActionType.FINISH_LOADING: {
      const { name } = action.payload;
      const newState = _.cloneDeep(state);
      const loading = _.pull(newState.loading, name);
      if (newState.loading.length === 0) {
        NProgress.done();
      }

      return {
        ...state,
        loading,
      };
    }

    case ActionType.UPDATE_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.payload.token,
      };
    }

    case ActionType.PROFILE.SUCCESS: {
      const { profile = {}, channels = {} } = action.payload;

      const newChannels = _.mapValues(channels, (channel) => {
        _.set(channel, 'streamInfo.sources', merge('streamInfo.sources', state.channels[channel.name], channel));
        return channel;
      });

      const channelsOrder = _(newChannels)
        .filter(channel => channel.followed)
        .orderBy(['live', 'streamInfo.viewers', 'subscribed', 'lastPublish'], ['desc', 'desc', 'desc', 'desc'])
        .map(channel => channel.name)
        .value();

      return {
        ...state,
        profile,
        channels: newChannels,
        channelsOrder,
      };
    }
    case ActionType.PROFILE.FAILURE: {
      return {
        ...state,
      };
    }

    case ActionType.LIVE_SOURCE.SUCCESS: {
      const { channelName, sources } = action.payload;
      const newState = _.cloneDeep(state);

      _.set(newState, `channels.${channelName}.streamInfo.sources`, sources);
      return newState;
    }

    case ActionType.RECORD_SOURCE.SUCCESS: {
      const { channelName, videoId, sources } = action.payload;
      const newState = _.cloneDeep(state);

      _.set(newState, `channels.${channelName}.videos.${videoId}.sources`, sources);
      return newState;
    }

    case ActionType.VIDEO_LIST.SUCCESS: {
      const { channelName, videos } = action.payload;

      const newState = _.cloneDeep(state);
      const channel = newState.channels[channelName];

      _.merge(channel.videos, videos);
      channel.videosOrder = _(channel.videos)
        .orderBy(['createdAt'], ['desc'])
        .map(video => video.id)
        .value();

      newState.channels[channelName] = channel;

      return newState;
    }

    case ActionType.VIDEO.SUCCESS: {
      const { channelName, videoId, data } = action.payload;

      const newState = _.cloneDeep(state);
      const video = _.merge(
        _.get(newState, `channels.${channelName}.videos.${videoId}`, {}),
        data,
      );

      _.set(newState, `channels.${channelName}.videos.${videoId}`, video);

      return newState;
    }

    default: return state;
  }
};
