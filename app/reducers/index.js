const actionTypes = {
  updateUser: 'UPDATE_USER',
  updateUserSubscriptions: 'UPDATE_USER_SUBSCRIPTIONS',
};

const initialState = {
  user: {
    id: null,
  },
  subscriptions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
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
