import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateUserAction } from '../actions';

import Layout from '../components/layouts/Layout';
import styles from './home.sass';

class Home extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
  }

  static defaultProps = {}

  // eslint-disable-next-line
  render() {
    return (
      <Layout>
        <div className={styles.wrapper}>
          <div className={styles.header}>Welcome to the Twitchewer!</div>
          <div className={styles.description}>Please, choise the channel on the left menu.</div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateUser: args => dispatch(updateUserAction(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
