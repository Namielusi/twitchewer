import { takeLatest } from 'redux-saga/effects';

import initialData from './generators/initialData';
import stream from './generators/stream';
import videoList from './generators/videoList';
import video from './generators/video';

import * as ActionType from '../actions';

export default function* rootSaga() {
  yield takeLatest(ActionType.INITIAL_DATA.REQUEST, initialData);
  yield takeLatest(ActionType.STREAM_SOURCES.REQUEST, stream);
  yield takeLatest(ActionType.VIDEO_LIST.REQUEST, videoList);
  yield takeLatest(ActionType.VIDEO.REQUEST, video);
}
