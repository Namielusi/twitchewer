import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { whyDidYouUpdate } from 'why-did-you-update'; // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';

import Routes from './routes';
import Store from './store';

import Layout from './imports/layouts/Layout';

const { store, persistor } = Store();

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter>
//         <Routes />
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root'),
// );

module.hot.accept();
