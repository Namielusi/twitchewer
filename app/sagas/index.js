// import { take, put, call, fork, select, all } from 'redux-saga/effects';
import _ from 'lodash';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import { getToken, getUserId } from './selectors';
import api from '../lib/api';

import * as ActionType from '../actions';

function* fetchInitialData(action) {
  try {
    const userInfo = yield call(api, 'get', 'https://api.twitch.tv/kraken/user', { accessToken: action.payload.token });
    yield put(ActionType.user.success(userInfo.data));

    const userId = yield select(getUserId);
    const { data: channelsRes } = yield call(api, 'get', `https://api.twitch.tv/kraken/users/${userId}/follows/channels`, { accessToken: action.payload.token });
    const { data: streamsRes } = yield call(api, 'get', 'https://api.twitch.tv/kraken/streams/followed', { accessToken: action.payload.token });

    const channels = [];
    const streams = {};

    streamsRes.streams.forEach((stream) => {
      streams[stream.channel._id] = {
        game: stream.game,
        previews: stream.preview,
        viewers: stream.viewers,
      };
    });

    yield Promise.all(_.map(channelsRes.follows, async ({ channel }) => {
      let subscribed;

      // Check is user subscribed to this channel
      try {
        await api('get', `https://api.twitch.tv/kraken/users/${userId}/subscriptions/${channel._id}`, { accessToken: action.payload.token });
        subscribed = true;
      } catch (e) {
        subscribed = false;
      }

      const { data: { videos: [lastVideoData] } } = await api('get', `https://api.twitch.tv/kraken/channels/${channel._id}/videos?limit=1`, { accessToken: action.payload.token });

      channels.push({
        id: channel._id,
        name: channel.name,
        displayName: channel.display_name,
        logo: channel.logo,
        banner: channel.profile_banner,
        subscribed,
        lastPublish: lastVideoData.published_at,
        streaming: typeof streams[channel._id] === 'object',
        streamInfo: streams[channel._id] || null,
        videos: [],
      });
    }));

    yield put(ActionType.channels.success(channels));
    yield put(ActionType.initialData.success());
  } catch (e) {
    yield put(ActionType.initialData.failure(e));
  }
}

function* fetchVideos(action) {
  const { channelId } = action.payload;
  const accessToken = yield select(getToken);

  try {
    const res = yield call(api, 'get', `https://api.twitch.tv/kraken/channels/${channelId}/videos`, { accessToken, params: { limit: 16 } });
    yield put(ActionType.videos.success(channelId, res.data));
  } catch (e) {
    yield put(ActionType.videos.failure(e));
  }
}

export default function* rootSaga() {
  yield takeLatest(ActionType.INITIAL_DATA.REQUEST, fetchInitialData);
  yield takeLatest(ActionType.VIDEOS.REQUEST, fetchVideos);
}
