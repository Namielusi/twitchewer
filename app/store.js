import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import rootReducers from './reducers';
import sagas from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'profile', 'channels', 'channelsOrder'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();

export default (history) => {
  let details = [
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(sagaMiddleware),
    process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];

  if (process.env.NODE_ENV !== 'production') {
    details = [compose(...details)];
  }

  const store = createStore(
    combineReducers({
      root: persistedReducer,
      router: routerReducer,
    }),
    ...details,
  );

  sagaMiddleware.run(sagas);

  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers'); // eslint-disable-line
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  return {
    store,
    persistor,
  };
};
