import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import { waitSelect } from 'Lib/helper';
import { Parser } from 'm3u8-parser';

import { getToken, getProfileId } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchrecordSource(action) {
  const { channelName, videoId } = action.payload;
  const accessToken = yield select(getToken);
  const sources = {};

  try {
    yield put(ActionType.startLoading('recordSource'));
    yield waitSelect(state => _.get(state, `root.channels.${channelName}.id`));

    const { data: { token, sig } } = yield call(api, 'get', `/proxy/api/vods/${videoId}/access_token`, { accessToken });

    const sourcesRaw = yield call(api, 'get', `/proxy/usher/vod/${videoId}.m3u8`, {
      accessToken,
      params: {
        nauth: token,
        nauthsig: sig,
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
        src: `/proxy/video?url=${uri}`,
        resolution: attributes.RESOLUTION,
        label,
        type: 'application/x-mpegURL',
      };
    });

    yield put(ActionType.recordSource.success(channelName, videoId, sources));
    yield put(ActionType.finishLoading('recordSource'));
  } catch (e) {
    yield put(ActionType.recordSource.failure(e));
    yield put(ActionType.finishLoading('recordSource'));
  }
}
