const actionTypes = {
  updateAccessToken: 'UPDATE_ACCESS_TOKEN',
  updateUserInfo: 'UPDATE_USER_INFO',
  updateChannelListAction: 'UPDATE_CHANNEL_LIST',
};

const initialState = {
  access_token: null,
  user: {
    id: null,
    name: null,
    displayName: null,
  },
  channels: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateAccessToken: {
      return {
        ...state,
        access_token: action.payload.token,
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
