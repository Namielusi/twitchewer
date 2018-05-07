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

    // case ActionType.USER.SUCCESS: {
    //   return {
    //     ...state,
    //     user: {
    //       id: action.payload._id,
    //       name: action.payload.name,
    //       displayName: action.payload.display_name,
    //       logo: action.payload.logo,
    //     },
    //   };
    // }

    // case ActionType.CHANNELS.SUCCESS: {
    //   return {
    //     ...state,
    //     channels: action.payload,
    //   };
    // }
    //
    // case ActionType.STREAM_SOURCES.SUCCESS: {
    //   const { channelName, sources } = action.payload;
    //   const newState = _.cloneDeep(state);
    //
    //   return _.set(newState, `channels.${channelName}.streamInfo.sources`, sources);
    // }
    //
    // case ActionType.VIDEO_LIST.SUCCESS: {
    //   const { channelName, list } = action.payload;
    //   const newState = _.cloneDeep(state);
    //   const videos = _.merge(newState.channels[channelName].videos, list);
    //
    //   return _.set(newState, `channels.${channelName}.videos`, videos);
    // }
    //
    // case ActionType.VIDEO.SUCCESS: {
    //   const { id, channelName, sources } = action.payload;
    //   const newState = _.cloneDeep(state);
    //
    //   return _.set(newState, `channels.${channelName}.videos.${id}.sources`, sources);
    // }

    default: return state;
  }
};
