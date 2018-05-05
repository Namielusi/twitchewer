import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';

import { getUserId } from '../selectors';
import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchInitialData(action) {
  try {
    const userInfo = yield call(api, 'get', 'https://api.twitch.tv/kraken/user', { accessToken: action.payload.token });
    yield put(ActionType.user.success(userInfo.data));

    const userId = yield select(getUserId);
    const { data: channelsRes } = yield call(api, 'get', `https://api.twitch.tv/kraken/users/${userId}/follows/channels`, { accessToken: action.payload.token });
    const { data: streamsRes } = yield call(api, 'get', 'https://api.twitch.tv/kraken/streams/followed', { accessToken: action.payload.token });

    const channels = {};

    yield Promise.all(_.map(channelsRes.follows, async ({ channel }) => {
      let subscribed;

      // Check is user subscribed to this channel
      try {
        await api('get', `https://api.twitch.tv/kraken/users/${userId}/subscriptions/${channel._id}`, { accessToken: action.payload.token });
        subscribed = true;
      } catch (e) {
        subscribed = false;
      }

      const { data: { videos: [lastVideoData] } } = await api('get', `https://api.twitch.tv/kraken/channels/${channel._id}/videos?limit=1`, { accessToken: action.payload.token });

      channels[channel.name] = {
        id: parseInt(channel._id, 10),
        name: channel.name,
        displayName: channel.display_name,
        logo: channel.logo,
        banner: channel.profile_banner,
        subscribed,
        lastPublish: lastVideoData.published_at,
        live: false,
        streamInfo: {},
        videosOrder: [],
        videos: {},
      };
    }));

    streamsRes.streams.forEach((stream) => {
      if (channels[stream.channel.name]) {
        channels[stream.channel.name].live = true;
        channels[stream.channel.name].streamInfo = {
          game: stream.game,
          previews: stream.preview,
          viewers: stream.viewers,
          sources: {},
        };
      }
    });

    yield put(ActionType.channels.success(channels));
    yield put(ActionType.initialData.success());
  } catch (e) {
    yield put(ActionType.initialData.failure(e));
  }
}
