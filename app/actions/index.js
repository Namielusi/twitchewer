const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createRequestTypes = base => [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});
const action = (type, payload = {}) => ({ type, payload });

export const INITIAL_DATA = createRequestTypes('INITIAL_DATA');
export const USER = createRequestTypes('USER');
export const CHANNELS = createRequestTypes('CHANNELS');
export const STREAMS = createRequestTypes('STREAMS');

export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

export const initialData = {
  request: token => action(INITIAL_DATA[REQUEST], { token }),
  success: response => action(INITIAL_DATA[SUCCESS], response),
  failure: error => action(INITIAL_DATA[FAILURE], { error }),
};

export const user = {
  request: token => action(USER[REQUEST], { token }),
  success: response => action(USER[SUCCESS], response),
  failure: error => action(USER[FAILURE], { error }),
};

export const channels = {
  request: token => action(CHANNELS[REQUEST], { token }),
  success: response => action(CHANNELS[SUCCESS], response),
  failure: error => action(CHANNELS[FAILURE], { error }),
};

export const streams = {
  request: token => action(CHANNELS[REQUEST], { token }),
  success: response => action(CHANNELS[SUCCESS], response),
  failure: error => action(CHANNELS[FAILURE], { error }),
};

export const updateAccessToken = token => action(UPDATE_ACCESS_TOKEN, { token });

// export const updateLoadingAction = state => ({
//   type: 'UPDATE_LOADING',
//   payload: state,
// });

// export const updateUserInfoAction = payload => ({
//   type: 'UPDATE_USER_INFO',
//   payload: {
//     id: payload.id,
//     name: payload.name,
//     displayName: payload.displayName,
//     logo: payload.logo,
//   },
// });

// export const updateChannelListAction = list => ({
//   type: 'UPDATE_CHANNEL_LIST',
//   payload: list,
// });
