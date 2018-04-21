import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.sass';

import MainMenu from './components/MainMenu';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.wrapper}>
        <MainMenu />
        <div className={styles.container}>{children}</div>
      </div>
    );
  }
}
