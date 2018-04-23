import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import moment from 'moment';
import classnames from 'classnames';

import {
  Person as PersonIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@material-ui/icons';
import { deepPurple200 } from 'material-ui/styles/colors';

import styles from './MainMenu.sass';

import MainMenuItem from './MainMenuItem';

class MainMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    className: '',
    user: {},
    channels: [],
  }

  constructor() {
    super();

    this.state = {
      opened: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      opened: !this.state.opened,
    });
  }

  render() {
    const { opened } = this.state;
    const {
      className,
      user,
      channels,
    } = this.props;

    let openArrow;
    if (opened) {
      openArrow = <KeyboardArrowLeftIcon color={deepPurple200} />;
    } else {
      openArrow = <KeyboardArrowRightIcon color={deepPurple200} />;
    }

    let profileItem;
    if (user.id) {
      const url = `/user/${user.name}`;
      profileItem = (
        <MainMenuItem
          img={user.logo}
          title={user.displayName}
          description="Go to your profile"
          url={url}
        />
      );
    } else {
      const img = <PersonIcon style={{ width: '100%', height: '100%' }} viewBox="0 0 25 25" color={deepPurple200} />;
      profileItem = (
        <MainMenuItem
          img={img}
          title="Sign In"
          url={`/user/${user.name}`}
        />
      );
    }

    const channelLinks = channels.map(channel => (
        <MainMenuItem
          key={channel.id}
          img={channel.logo}
          title={channel.displayName}
          description={`Last broadcast was ${moment((channel.videos[0] || {}).published_at).fromNow()}`}
          url={`/user/${channel.name}`}
        />
    ));

    const classes = classnames(styles.wrapper, className);
    const containerClasses = classnames(
      styles.container,
      opened ? styles.container_opened : null,
    );

    return (
      <div className={classes}>
        <div className={containerClasses}>
          <div className={styles.contentContainer}>
            <div className={styles.arrowWrapper} onClick={this.toggleMenu}>{openArrow}</div>
            {profileItem}
          </div>
          <div className={styles.verticalLine} />
          <div className={styles.contentContainer}>
            <div className={styles.itemWrapper}>{channelLinks}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default pure(MainMenu);
