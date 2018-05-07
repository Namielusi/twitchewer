const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createRequestTypes = base => [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});
const action = (type, payload = {}) => ({ type, payload });

// export const INITIAL_DATA = createRequestTypes('INITIAL_DATA');
export const PROFILE = createRequestTypes('PROFILE');
export const LIVE_SOURCE = createRequestTypes('LIVE_SOURCE');
export const RECORD_SOURCE = createRequestTypes('RECORD_SOURCE');
// export const STREAM_SOURCES = createRequestTypes('STREAM_SOURCES');
// export const VIDEO_LIST = createRequestTypes('VIDEO_LIST');
// export const VIDEO = createRequestTypes('VIDEO');

export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

// export const initialData = {
//   request: token => action(INITIAL_DATA[REQUEST], { token }),
//   success: response => action(INITIAL_DATA[SUCCESS], response),
//   failure: error => action(INITIAL_DATA[FAILURE], { error }),
// };

export const profile = {
  request: accessToken => action(PROFILE[REQUEST], { accessToken }),
  success: (profileInfo, channels) => action(PROFILE[SUCCESS], { profile: profileInfo, channels }),
  failure: error => action(PROFILE[FAILURE], { error }),
};

export const liveSource = {
  request: channelName => action(LIVE_SOURCE[REQUEST], { channelName }),
  success: (channelName, sources) => action(LIVE_SOURCE[SUCCESS], { channelName, sources }),
  failure: error => action(LIVE_SOURCE[FAILURE], { error }),
};

export const recordSource = {
  request: token => action(RECORD_SOURCE[REQUEST], { token }),
  success: response => action(RECORD_SOURCE[SUCCESS], response),
  failure: error => action(RECORD_SOURCE[FAILURE], { error }),
};

// export const streamSources = {
//   request: channelName => action(STREAM_SOURCES[REQUEST], { channelName }),
//   success: (channelName, sources) => action(STREAM_SOURCES[SUCCESS], { channelName, sources }),
//   failure: error => action(STREAM_SOURCES[FAILURE], { error }),
// };
//
// export const videoList = {
//   request: (channelId, channelName, page) =>
//     action(VIDEO_LIST[REQUEST], { channelId, channelName, page }),
//   success: (channelName, list) => action(VIDEO_LIST[SUCCESS], { channelName, list }),
//   failure: error => action(VIDEO_LIST[FAILURE], { error }),
// };
//
// export const video = {
//   request: (id, channelName) => action(VIDEO[REQUEST], { id, channelName }),
//   success: (id, channelName, sources) => action(VIDEO[SUCCESS], { id, channelName, sources }),
//   failure: error => action(VIDEO[FAILURE], { error }),
// };

export const startLoading = name => action(START_LOADING, { name });
export const finishLoading = name => action(FINISH_LOADING, { name });
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
