// import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import { Parser } from 'm3u8-parser';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchStreamSources(action) {
  const { channelName, id } = action.payload;
  const accessToken = yield select(getToken);

  try {
    const { data: tokens } = yield call(api, 'get', `/proxy/api/vods/${id}/access_token`, { accessToken });

    const sourcesRaw = yield call(api, 'get', `/proxy/usher/vod/${id}.m3u8`, {
      accessToken,
      params: {
        // player: 'twitchweb',
        nauth: tokens.token,
        nauthsig: tokens.sig,
        // allow_audio_only: true,
        // allow_source: true,
        // type: 'any',
        // p: _.random(100000, 999999),
      },
      headers: {
        Accept: null,
      },
    });

    const parser = new Parser();
    parser.push(sourcesRaw.data);
    parser.end();

    const sources = [];
    parser.manifest.playlists.forEach((source) => {
      const { attributes, uri } = source;

      if (attributes.VIDEO === 'audio_only') { return; }
      sources.push({
        src: `/proxy/video?url=${uri}`,
        resolution: attributes.RESOLUTION,
        label: attributes.VIDEO === 'chunked' ? 'source' : attributes.VIDEO,
      });
    });

    yield put(ActionType.video.success(id, channelName, sources));
  } catch (e) {
    yield put(ActionType.video.failure(e));
  }
}
