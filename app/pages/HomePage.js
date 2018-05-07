import React from 'react';
import { connect } from 'react-redux';

// import { updateUserInfoAction } from '../actions';

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

// class Home extends Component {
//   static propTypes = {
//     user: PropTypes.shape({}),
//   }
//
//   static defaultProps = {}
//
//   render() {
//     return (
//       <div>
//         <WelcomeMessage />
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   user: state.user,
// });
//
// const mapDispatchToProps = dispatch => ({
//   updateUser: args => dispatch(updateUserInfoAction(args)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(null, null)(HomePage);
