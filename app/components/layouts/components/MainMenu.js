import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './MainMenu.sass';

import Logo from './Logo';
import MainMenuItem from './MainMenuItem';

export default class MainMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={classnames(styles.wrapper, className)}>
        <Logo />
        <div className={styles.verticalLine} />
        <div className={styles.itemWrapper}>
          <MainMenuItem />
          <MainMenuItem />
          <MainMenuItem />
          <MainMenuItem />
          <MainMenuItem />
          <MainMenuItem />
          <MainMenuItem />
          <MainMenuItem />
        </div>
      </div>
    );
  }
}
