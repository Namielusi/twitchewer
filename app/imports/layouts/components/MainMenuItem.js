import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import Link from 'react-router-dom/Link';

import styles from './MainMenuItem.sass';

class MainMenuItem extends Component {
  static propTypes = {
    img: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    external: PropTypes.bool,
  }

  static defaultProps = {
    img: '',
    title: '',
    description: '',
    url: '',
    external: false,
  }

  render() {
    const {
      img,
      title,
      description,
      url,
      external,
    } = this.props;

    const image = typeof img === 'string' ?
      <img className={styles.image} src={img} /> :
      img;

    const externalProp = external ? { target: '_self' } : {};

    return (
      <div className={styles.item}>
        <Link className={styles.itemLogoLink} to={url} {...externalProp}>
          <div className={styles.itemLogo}>{image}</div>
        </Link>
        <div className={styles.itemInfo}>
          <Link className={styles.itemInfoLink} to={url} {...externalProp}>
            <div className={styles.itemTitle}>{title}</div>
          </Link>
          <div className={styles.itemDesc}>{description}</div>
        </div>
      </div>
    );
  }
}

export default pure(MainMenuItem);
