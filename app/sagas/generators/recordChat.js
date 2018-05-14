import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import { waitSelect } from 'Lib/helper';
import { Parser } from 'm3u8-parser';

import { getToken } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchRecordChat(action) {
  const { channelName, videoId, data } = action.payload;
  const accessToken = yield select(getToken);

  try {
    // yield put(ActionType.startLoading('recordChat'));
    // yield waitSelect(state => _.get(state, `root.channels.${channelName}.id`));

    const { data: chatRes } = yield call(api, 'get', `https://api.twitch.tv/v5/videos/${videoId}/comments`, {
      accessToken,
      params: data,
      headers: {
        Accept: null,
        Authorization: null,
      },
    });

    const comments = _.reduce(chatRes.comments, (acc, value) => {
      acc[value._id] = {
        id: value._id,
        position: value.content_offset_seconds,
        commenter: {
          id: parseInt(value.commenter._id, 10),
          name: value.commenter.name,
          display_name: value.commenter.display_name,
        },
        message: value.message.body,
        created_at: value.created_at,
      };
      return acc;
    }, {});

    yield put(ActionType.recordChat.success(channelName, videoId, comments));
    // yield put(ActionType.finishLoading('recordChat'));
  } catch (e) {
    yield put(ActionType.recordChat.failure(e));
    // yield put(ActionType.finishLoading('recordChat'));
  }
}
