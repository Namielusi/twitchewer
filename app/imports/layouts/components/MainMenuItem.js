import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import classnames from 'classnames';

import { Row, Col } from 'reactstrap';
import NavLink from 'react-router-dom/NavLink';

import styles from './MainMenuItem.sass';

class MainMenuItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    smallClassName: PropTypes.string,
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
    className: '',
    smallClassName: '',
    img: '',
    title: '',
    description: '',
    url: '',
    external: false,
  }

  render() {
    const {
      className,
      smallClassName,
      img,
      title,
      description,
      url,
      external,
    } = this.props;

    const classes = classnames('list-group-item', 'rounded-0', className);
    const smallClasses = classnames(styles.small, smallClassName);

    const externalProp = external ? { target: '_self' } : {};
    const image = typeof img === 'string' ?
      <img className="w-100 rounded float-left" src={img} /> :
      img;

    return (
      <NavLink className={classes} to={url} {...externalProp}>
        <Row className="align-items-center">
          <Col className="text-center" md="3">{image}</Col>
          <Col sm>
            <Row>{title}</Row>
            <Row>
              <small className={smallClasses}>{description}</small>
            </Row>
          </Col>
        </Row>
      </NavLink>
    );
  }
}

export default pure(MainMenuItem);
