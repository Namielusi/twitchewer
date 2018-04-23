/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { whyDidYouUpdate } from 'why-did-you-update'; // eslint-disable-line

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { Route, Switch, Link } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import rootReducers from './reducers';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

import Layout from './imports/layouts/Layout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import OAuthPage from './pages/OAuthCallback';

// ######################################################

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

const history = createHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'channels'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(
    combineReducers({
      root: persistedReducer,
      router: routerReducer,
    }),
    applyMiddleware(routerMiddleware(history)),
  )
} else {
  store = createStore(
    combineReducers({
      root: persistedReducer,
      router: routerReducer,
    }),
    compose(
      applyMiddleware(routerMiddleware(history)),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  )
}

const persistor = persistStore(store);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./reducers'); // eslint-disable-line
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
  });
}

const ConnectedSwitch = connect(state => ({ location: state.router.location }))(Switch);

const RouteEx = ({ component: Component, ...props }) => {
  const wrapper = () => <Layout><Component {...props}/></Layout>;
  return <Route component={wrapper} {...props}/>;
};

const AppContainer = () => (
  <ConnectedSwitch>
    <RouteEx exact path="/" component={HomePage} />
    <RouteEx exact path="/oauth" component={OAuthPage} />
    <RouteEx path="/user/:name" component={UserPage} />
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
