export const updateAccessToken = token => ({
  type: 'UPDATE_ACCESS_TOKEN',
  payload: {
    token,
  },
});

export const updateUserAction = () => ({
  type: 'UPDATE_USER',
});

export const updateUserSubscriptionsAction = uid => ({
  type: 'UPDATE_USER_SUBSCRIPTIONS',
  uid,
});
