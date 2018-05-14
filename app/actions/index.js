const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createRequestTypes = base => [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});
const action = (type, payload = {}) => ({ type, payload });

export const PROFILE = createRequestTypes('PROFILE');
export const LIVE_SOURCE = createRequestTypes('LIVE_SOURCE');
export const RECORD_SOURCE = createRequestTypes('RECORD_SOURCE');
export const VIDEO_LIST = createRequestTypes('VIDEO_LIST');
export const VIDEO = createRequestTypes('VIDEO');

export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';
export const LOG_OUT = 'LOG_OUT';

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
  request: (channelName, videoId) => action(RECORD_SOURCE[REQUEST], { channelName, videoId }),
  success: (channelName, videoId, sources) => action(RECORD_SOURCE[SUCCESS], {
    channelName, videoId, sources,
  }),
  failure: error => action(RECORD_SOURCE[FAILURE], { error }),
};

export const videoList = {
  request: (channelName, limit, offset) => action(VIDEO_LIST[REQUEST], {
    channelName, limit, offset,
  }),
  success: (channelName, videos) => action(VIDEO_LIST[SUCCESS], { channelName, videos }),
  failure: error => action(VIDEO_LIST[FAILURE], { error }),
};

export const video = {
  request: (channelName, videoId) => action(VIDEO[REQUEST], { channelName, videoId }),
  success: (channelName, videoId, data) => action(VIDEO[SUCCESS], { channelName, videoId, data }),
  failure: error => action(VIDEO[FAILURE], { error }),
};

export const startLoading = name => action(START_LOADING, { name });
export const finishLoading = name => action(FINISH_LOADING, { name });
export const updateAccessToken = token => action(UPDATE_ACCESS_TOKEN, { token });
export const logOut = () => action(LOG_OUT);
