import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './imports/layouts/Layout';
import Home from './pages/home';

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </Layout>
);

export default Routes;
