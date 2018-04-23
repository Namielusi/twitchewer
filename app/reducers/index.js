const actionTypes = {
  updateLoadingAction: 'UPDATE_LOADING',
  updateAccessToken: 'UPDATE_ACCESS_TOKEN',
  updateUserInfo: 'UPDATE_USER_INFO',
  updateChannelListAction: 'UPDATE_CHANNEL_LIST',
};

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
    case actionTypes.updateLoadingAction: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case actionTypes.updateAccessToken: {
      return {
        ...state,
        accessToken: action.payload.token,
      };
    }
    case actionTypes.updateUserInfo: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }
    case actionTypes.updateChannelListAction: {
      return {
        ...state,
        channels: action.payload,
      };
    }
    default: return state;
  }
};
