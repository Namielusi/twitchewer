import React from 'react';
import { connect } from 'react-redux';

import Layout from 'Layout/Layout';
import Body from 'Layout/Body';

const ProfilePage = () => (
  <Layout hideSideBar>
    <Body>
      Profile
    </Body>
  </Layout>
);

export default connect(null, null)(ProfilePage);
