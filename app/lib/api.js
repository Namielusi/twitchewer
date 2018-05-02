import _ from 'lodash';
import axios from 'axios';

export default async (method, url, data = {}) => {
  let tries = 0;
  const send = async () => new Promise((resolve) => {
    const headers = _.omitBy({
      Accept: 'application/vnd.twitchtv.v5+json',
      Authorization: `OAuth ${data.accessToken}`,
      'Client-ID': process.env.CLIENT_ID,
      ...data.headers,
    }, _.isNil);

    try {
      const res = axios({
        method,
        url,
        params: data.params || {},
        data: data.body || {},
        headers,
      });
      resolve(res);
    } catch (e) {
      if (tries === 3) {
        throw e;
      }

      setTimeout(() => {
        tries += 1;
        send();
      }, 1000);
    }
  });

  return send();
};
