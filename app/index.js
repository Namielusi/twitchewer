import React from 'react';
import ReactDOM from 'react-dom';
import { whyDidYouUpdate } from 'why-did-you-update'; // eslint-disable-line

import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

import Store from './store';

import Layout from './imports/layouts/Layout';
import HomePage from './pages/HomePage';
import LiveStreamPage from './pages/user/LiveStreamPage';
import VideoListPage from './pages/user/VideoListPage';
import OAuthPage from './pages/OAuthCallback';

// ######################################################

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

const history = createHistory();

const { store, persistor } = Store(history);

const ConnectedSwitch = connect(state => ({ location: state.router.location }))(Switch);

// eslint-disable-next-line
const RouteEx = ({ component: Component, ...props }) => {
  const wrapper = () => <Layout><Component {...props}/></Layout>;
  return <Route component={wrapper} {...props}/>;
};

const AppContainer = () => (
  <ConnectedSwitch>
    <RouteEx exact path="/" component={HomePage} />
    <RouteEx exact path="/oauth" component={OAuthPage} />
    <RouteEx exact path="/user/:name" component={LiveStreamPage} />
    <RouteEx path="/user/:name/videos" component={VideoListPage} />
    <RouteEx path="/user/:name/videos/:page" component={VideoListPage} />
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
