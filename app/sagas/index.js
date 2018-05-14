import { takeLatest } from 'redux-saga/effects';

import profile from './generators/profile';
import liveSource from './generators/liveSource';
import recordSource from './generators/recordSource';
import recordChat from './generators/recordChat';
import videoList from './generators/videoList';
import video from './generators/video';

import * as ActionType from '../actions';

export default function* rootSaga() {
  yield takeLatest(ActionType.PROFILE.REQUEST, profile);
  yield takeLatest(ActionType.LIVE_SOURCE.REQUEST, liveSource);
  yield takeLatest(ActionType.RECORD_SOURCE.REQUEST, recordSource);
  yield takeLatest(ActionType.RECORD_CHAT.REQUEST, recordChat);
  yield takeLatest(ActionType.VIDEO_LIST.REQUEST, videoList);
  yield takeLatest(ActionType.VIDEO.REQUEST, video);
}
