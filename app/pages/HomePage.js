import React from 'react';
import { connect } from 'react-redux';

// import { updateUserInfoAction } from '../actions';

// import Layout from '../imports/layouts/Layout';
import WelcomeMessage from '../imports/pages/home/WelcomeMessage';

const HomePage = () => (
  <WelcomeMessage />
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
