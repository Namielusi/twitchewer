export const updateUserAction = () => ({
  type: 'UPDATE_USER',
});

export const updateUserSubscriptionsAction = uid => ({
  type: 'UPDATE_USER_SUBSCRIPTIONS',
  uid,
});
