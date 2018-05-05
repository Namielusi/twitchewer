import _ from 'lodash';
import NProgress from 'nprogress';
import * as ActionType from '../actions';

const initialState = {
  loading: false,
  accessToken: null,
  profile: {
    id: null,
    name: null,
    displayName: null,
  },
  channels: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.payload.token,
      };
    }

    case ActionType.INITIAL_DATA.REQUEST: {
      NProgress.start();
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.INITIAL_DATA.SUCCESS: {
      NProgress.done();
      return {
        ...state,
        loading: false,
      };
    }
    case ActionType.INITIAL_DATA.FAILURE: {
      NProgress.done();
      return state;
    }

    case ActionType.USER.SUCCESS: {
      return {
        ...state,
        user: {
          id: action.payload._id,
          name: action.payload.name,
          displayName: action.payload.display_name,
          logo: action.payload.logo,
        },
      };
    }

    case ActionType.CHANNELS.SUCCESS: {
      return {
        ...state,
        channels: action.payload,
      };
    }

    case ActionType.STREAM_SOURCES.SUCCESS: {
      const { channelName, sources } = action.payload;
      const newState = _.cloneDeep(state);

      return _.set(newState, `channels.${channelName}.streamInfo.sources`, sources);
    }

    case ActionType.VIDEO_LIST.SUCCESS: {
      const { channelName, list } = action.payload;
      const newState = _.cloneDeep(state);
      const videos = _.merge(newState.channels[channelName].videos, list);

      return _.set(newState, `channels.${channelName}.videos`, videos);
    }

    case ActionType.VIDEO.SUCCESS: {
      const { id, channelName, sources } = action.payload;
      const newState = _.cloneDeep(state);

      return _.set(newState, `channels.${channelName}.videos.${id}.sources`, sources);
    }

    default: return state;
  }
};
