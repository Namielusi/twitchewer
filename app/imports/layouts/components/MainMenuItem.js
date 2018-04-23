/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,

  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';
import classnames from 'classnames';
import { pure } from 'recompose';
import Link from 'react-router-dom/Link';

import styles from './MainMenuItem.sass';

class MainMenuItem extends Component {
  static propTypes = {
    className: PropTypes.string,
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
    img: '',
    title: '',
    description: '',
    url: '',
    external: false,
  }

  render() {
    const {
      className,
      img,
      title,
      description,
      url,
      external,
    } = this.props;

    const classes = classnames('list-group-item', 'rounded-0', className);

    const externalProp = external ? { target: '_self' } : {};
    const image = typeof img === 'string' ?
      <img className="w-100 rounded float-left" src={img} /> :
      img;

    return (
      <Link className={classes} to={url} {...externalProp}>
        <Row className="align-items-center">
          <Col className="text-center" md="3">{image}</Col>
          <Col sm>
            <Row>{title}</Row>
            <Row>
              <small className={styles.small}>{description}</small>
            </Row>
          </Col>
        </Row>
      </Link>
    );
  }
}

export default pure(MainMenuItem);
