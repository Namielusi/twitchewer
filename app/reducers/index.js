const actionTypes = {
  updateAccessToken: 'UPDATE_ACCESS_TOKEN',
  updateUser: 'UPDATE_USER',
  updateUserSubscriptions: 'UPDATE_USER_SUBSCRIPTIONS',
};

const initialState = {
  access_token: null,
  user: {
    id: null,
  },
  subscriptions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateAccessToken: {
      return {
        ...state,
        access_token: action.payload.token,
      };
    }
    case actionTypes.updateUser: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }
    case actionTypes.updateUserSubscriptions: {
      return {
        ...state,
        subscriptions: action.payload,
      };
    }
    default: return state;
  }
};
