import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchVideoList(action) {
  const { channelId, channelName, page } = action.payload;
  const accessToken = yield select(getToken);
  const limit = page * 16;

  try {
    const res = yield call(api, 'get', `https://api.twitch.tv/kraken/channels/${channelId}/videos`, { accessToken, params: { limit } });

    console.log(res.data.videos);

    const videos = _.reduce(res.data.videos, (acc, video) => {
      const id = parseInt(video._id.slice(1), 10);
      acc[id] = {
        id,
        broadcastId: video.broadcast_id,
        status: video.status,
        length: video.length,
        title: video.title,
        description: video.decsription,
        game: video.game,
        previews: video.preview,
        resolutions: video.resolutions,
        createdAt: video.created_at,
        publishedAt: video.published_at,
      };
      return acc;
    }, {});

    yield put(ActionType.videoList.success(channelName, videos));
  } catch (e) {
    yield put(ActionType.videoList.failure(e));
  }
}
