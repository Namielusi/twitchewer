import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';

import Routes from './routes';
import Store from './store';

import Layout from './imports/layouts/Layout';

const { store, persistor } = Store();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

module.hot.accept();
