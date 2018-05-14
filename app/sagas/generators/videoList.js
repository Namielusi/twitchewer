import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import { waitSelect } from 'Lib/helper';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchVideoList(action) {
  const { channelName, limit = 16, offset = 0 } = action.payload;
  const accessToken = yield select(getToken);
  const channelId = yield waitSelect(state => _.get(state, `root.channels.${channelName}.id`));

  try {
    yield put(ActionType.startLoading('videoList'));
    const res = yield call(api, 'get', `https://api.twitch.tv/kraken/channels/${channelId}/videos`, { accessToken, params: { limit, offset } });

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
        preview: video.preview.medium,
        resolutions: video.resolutions,
        sources: {},
        createdAt: video.created_at,
        publishedAt: video.published_at,
      };
      return acc;
    }, {});

    yield put(ActionType.videoList.success(channelName, videos));
    yield put(ActionType.finishLoading('videoList'));
  } catch (e) {
    yield put(ActionType.videoList.failure(e));
    yield put(ActionType.finishLoading('videoList'));
  }
}
