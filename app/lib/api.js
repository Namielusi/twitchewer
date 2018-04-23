import axios from 'axios';

export default (method, url, data = {}) => async (accessToken) => {
  let tries = 0;
  const send = async () => new Promise((resolve) => {
    try {
      const res = axios({
        method,
        url,
        params: data.params || {},
        data: data.body || {},
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `OAuth ${accessToken}`,
          'Client-ID': process.env.CLIENT_ID,
        },
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
