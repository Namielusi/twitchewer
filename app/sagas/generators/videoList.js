import { put, call, select } from 'redux-saga/effects';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchVideoList(action) {
  const { channelId } = action.payload;
  const accessToken = yield select(getToken);

  try {
    const res = yield call(api, 'get', `https://api.twitch.tv/kraken/channels/${channelId}/videos`, { accessToken, params: { limit: 16 } });
    yield put(ActionType.videoList.success(channelId, res.data));
  } catch (e) {
    yield put(ActionType.videoList.failure(e));
  }
}
