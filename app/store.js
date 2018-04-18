import { createStore, combineReducers } from 'redux';

import home from './pages/home/reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    home,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
