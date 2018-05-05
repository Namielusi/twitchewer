const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const axios = require('axios');

const webpack = require('./webpack');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(webpack);
}

const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.use('/proxy/api', proxy({
  target: 'https://api.twitch.tv',
  changeOrigin: true,
  pathRewrite: { '^/proxy/api': '/api' },
}));

app.use('/proxy/usher', proxy({
  target: 'http://usher.twitch.tv',
  changeOrigin: true,
  pathRewrite: { '^/proxy/usher': '' },
}));

app.use('/proxy/vod', proxy({
  target: 'https://vod-metro.twitch.tv',
  changeOrigin: true,
  pathRewrite: { '^/proxy/vod': '' },
}));

app.get('/proxy/video', async (req, res, next) => { // eslint-disable-line
  const { url } = req.query;

  const vodRes = await axios({
    mathod: 'GET',
    url,
    headers: {
      'Content-type': 'application/vnd.apple.mpegurl',
    },
  });

  const [, processedUrl, quality] = url.match(/http(?!s)?:\/\/[^/]+\/([^/]+)\/([a-zA-Z0-9]+)/);
  const processed = vodRes.data.replace(/^([0-9]+(-muted)?.ts)/gm, `/proxy/vod/${processedUrl}/${quality}/$1`);

  res.set(vodRes.headers || {});
  res.send(processed);
});

app.get('/*', (req, res) => {
  console.log(req.originalUrl);

  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port} in ${app.get('env')} mode`);
});
