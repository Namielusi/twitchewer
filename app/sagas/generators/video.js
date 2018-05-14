import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import { waitSelect } from 'Lib/helper';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchVideo(action) {
  const { channelName, videoId } = action.payload;
  const accessToken = yield select(getToken);
  yield waitSelect(state => _.get(state, `root.channels.${channelName}.id`));

  try {
    yield put(ActionType.startLoading('video'));
    const { data: video } = yield call(api, 'get', `https://api.twitch.tv/kraken/videos/${videoId}`, { accessToken, headers: { Accept: null } });

    const id = parseInt(video._id.slice(1), 10);

    yield put(ActionType.video.success(channelName, id, {
      id,
      broadcastId: video.broadcast_id,
      status: video.status,
      length: video.length,
      title: video.title,
      description: video.decsription,
      game: video.game,
      preview: video.preview,
      resolutions: video.resolutions,
      sources: {},
      mutedSegments: video.muted_segments,
      createdAt: video.created_at,
      publishedAt: video.published_at,
    }));
    yield put(ActionType.finishLoading('video'));
  } catch (e) {
    yield put(ActionType.video.failure(e));
    yield put(ActionType.finishLoading('video'));
  }
}
