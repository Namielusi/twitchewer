import React from 'react';
import { connect } from 'react-redux';

import Layout from 'Layout/Layout';
import Body from 'Layout/Body';
import SideBar from 'Layout/SideBar';
import WelcomeMessage from '../imports/pages/home/WelcomeMessage';

const HomePage = () => (
  <Layout>
    <Body>
      <WelcomeMessage />
    </Body>
    <SideBar>
      SideBar!
    </SideBar>
  </Layout>
);

export default connect(null, null)(HomePage);
