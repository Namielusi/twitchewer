import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home';
import UserPage from './pages/user';
import OAuthPage from './pages/callback/oauth';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/callback/oauth' component={OAuthPage} />
    <Route exact path='/user' component={UserPage} />
    <Route path='/user/:nickname' component={UserPage} />
  </Switch>
);

export default Routes;
