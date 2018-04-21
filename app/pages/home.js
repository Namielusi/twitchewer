import React from 'react';
import { connect } from 'react-redux';

// import { updateUserAction } from '../actions';

import WelcomeMessage from '../imports/pages/home/WelcomeMessage';

const HomePage = () => (<WelcomeMessage />);

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
//   updateUser: args => dispatch(updateUserAction(args)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(null, null)(HomePage);
