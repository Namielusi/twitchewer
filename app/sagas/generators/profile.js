import { put, call } from 'redux-saga/effects';

import api from '../../lib/api';

import * as ActionType from '../../actions';

export default function* fetchProfileData(action) {
  const { accessToken } = action.payload;
  const channels = {};

  try {
    yield put(ActionType.startLoading('profile'));

    const { data: profile } = yield call(api, 'get', 'https://api.twitch.tv/kraken/user', { accessToken });

    const profileId = parseInt(profile._id, 10);
    const { data: channelsRes } = yield call(api, 'get', `https://api.twitch.tv/kraken/users/${profileId}/follows/channels`, { accessToken });
    const { data: streamsRes } = yield call(api, 'get', 'https://api.twitch.tv/kraken/streams/followed', { accessToken });

    yield channelsRes.follows.map(async ({ channel }) => {
      let subscribed;
      api('get', `https://api.twitch.tv/kraken/users/${profileId}/subscriptions/${channel._id}`, { accessToken })
        .then(() => { subscribed = true; })
        .catch(() => { subscribed = false; });

      const { data: { videos: [lastVideoData] } } = await api('get', `https://api.twitch.tv/kraken/channels/${channel._id}/videos?limit=1`, { accessToken });

      channels[channel.name] = {
        id: parseInt(channel._id, 10),
        name: channel.name,
        displayName: channel.display_name,
        logo: channel.logo,
        banner: channel.profile_banner,
        subscribed,
        followed: true,
        lastPublish: lastVideoData.published_at,
        live: false,
        streamInfo: {},
        videosOrder: [],
        videos: {},
      };
    });

    yield streamsRes.streams.forEach((stream) => {
      if (channels[stream.channel.name]) {
        channels[stream.channel.name] = {
          ...channels[stream.channel.name],
          live: true,
          streamInfo: {
            game: stream.game,
            previews: stream.preview,
            viewers: stream.viewers,
            sources: {},
          },
        };
      }
    });

    yield put(ActionType.profile.success({
      id: profileId,
      name: profile.name,
      displayName: profile.display_name,
      logo: profile.logo,
    }, channels));
    yield put(ActionType.finishLoading('profile'));
  } catch (e) {
    yield put(ActionType.profile.failure(e));
    yield put(ActionType.finishLoading('profile'));
  }
}
