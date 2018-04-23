export const updateAccessToken = token => ({
  type: 'UPDATE_ACCESS_TOKEN',
  payload: {
    token,
  },
});

export const updateUserInfoAction = payload => ({
  type: 'UPDATE_USER_INFO',
  payload: {
    id: payload.id,
    name: payload.name,
    displayName: payload.displayName,
    logo: payload.logo,
  },
});

export const updateChannelListAction = list => ({
  type: 'UPDATE_CHANNEL_LIST',
  payload: list,
});
