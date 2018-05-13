import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import { Parser } from 'm3u8-parser';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchLiveSource(action) {
  const { channelName } = action.payload;
  const accessToken = yield select(getToken);
  const sources = {};

  try {
    yield put(ActionType.startLoading('liveSource'));

    const { data: tokens } = yield call(api, 'get', `/proxy/api/channels/${channelName}/access_token`, { accessToken });

    const sourcesRaw = yield call(api, 'get', `/proxy/usher/api/channel/hls/${channelName}.m3u8`, {
      accessToken,
      params: {
        player: 'twitchweb',
        token: tokens.token,
        sig: tokens.sig,
        allow_audio_only: true,
        allow_source: true,
        type: 'any',
        p: _.random(100000, 999999),
      },
      headers: {
        Accept: null,
      },
    });

    const parser = new Parser();
    parser.push(sourcesRaw.data);
    parser.end();

    parser.manifest.playlists.forEach((source) => {
      const { attributes, uri } = source;

      if (attributes.VIDEO === 'audio_only') { return; }
      const label = attributes.VIDEO === 'chunked' ? 'source' : attributes.VIDEO;

      sources[label] = {
        src: uri,
        resolution: attributes.RESOLUTION,
        label,
        type: 'application/x-mpegURL',
      };
    });

    yield put(ActionType.liveSource.success(channelName, sources));
    yield put(ActionType.finishLoading('liveSource'));
  } catch (e) {
    yield put(ActionType.liveSource.failure(e));
    yield put(ActionType.finishLoading('liveSource'));
  }
}
