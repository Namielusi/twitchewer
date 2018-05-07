import React from 'react';
import ReactDOM from 'react-dom';
import { whyDidYouUpdate } from 'why-did-you-update'; // eslint-disable-line

import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import 'normalize.css';
import 'nprogress/nprogress.css';
import 'bootstrap';
import './bootstrap.global.sass';

import Store from './store';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LiveStreamPage from './pages/channel/LiveStreamPage';
import VideoListPage from './pages/channel/VideoListPage';
import VideoPage from './pages/channel/VideoPage';
// import OAuthPage from './pages/OAuthCallback';

// ######################################################

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

const history = createHistory();

const { store, persistor } = Store(history);

const ConnectedSwitch = connect(state => ({ location: state.router.location }))(Switch);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/profile" component={ProfilePage} />
    {/* <Route exact path="/oauth" component={OAuthPage} /> */}
    <Route exact path="/channels/:name" component={LiveStreamPage} />
    <Route exact path="/channels/:name/videos" component={VideoListPage} />
    <Route exact path="/channels/:name/videos/:id" component={VideoPage} />
  </ConnectedSwitch>
);

const App = connect(state => ({ location: state.router.location }))(AppContainer);

// ######################################################

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

module.hot.accept();
