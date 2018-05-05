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
export const STREAM_SOURCES = createRequestTypes('STREAM_SOURCES');
export const VIDEO_LIST = createRequestTypes('VIDEO_LIST');
export const VIDEO = createRequestTypes('VIDEO');

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

export const streamSources = {
  request: channelName => action(STREAM_SOURCES[REQUEST], { channelName }),
  success: (channelName, sources) => action(STREAM_SOURCES[SUCCESS], { channelName, sources }),
  failure: error => action(STREAM_SOURCES[FAILURE], { error }),
};

export const videoList = {
  request: (channelId, channelName, page) =>
    action(VIDEO_LIST[REQUEST], { channelId, channelName, page }),
  success: (channelName, list) => action(VIDEO_LIST[SUCCESS], { channelName, list }),
  failure: error => action(VIDEO_LIST[FAILURE], { error }),
};

export const video = {
  request: (id, channelName) => action(VIDEO[REQUEST], { id, channelName }),
  success: (id, channelName, sources) => action(VIDEO[SUCCESS], { id, channelName, sources }),
  failure: error => action(VIDEO[FAILURE], { error }),
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
