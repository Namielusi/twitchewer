import NProgress from 'nprogress';
import * as ActionType from '../actions';

const initialState = {
  loading: false,
  accessToken: null,
  user: {
    id: null,
    name: null,
    displayName: null,
  },
  channels: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    default: return state;
  }
};
