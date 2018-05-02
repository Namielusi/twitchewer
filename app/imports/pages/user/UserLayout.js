/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import NavLink from 'react-router-dom/NavLink';

import styles from './UserLayout.sass';

export default class UserLayout extends Component {
  render() {
    const {
      className,
      channel,
      children,
      sideBarType,
    } = this.props;

    const menuClasses = classnames(
      styles.sideBar,
      'mh-100 border border-top-0 border-right-0 border-bottom-0',
    );
    const bodyClasses = classnames(
      styles.body,
      'mh-100',
      className,
    );

    let sideBarComponent;
    if (sideBarType === 'chat') {
      sideBarComponent = <div>Chat (not a component)</div>;
    } else {
      sideBarComponent = (
        <Col className={menuClasses} xs="2">
          <Card className="rounded-0 border-0">
            <CardBody>
              <CardTitle>{channel.displayName}</CardTitle>
              <CardSubtitle>
                <small className="text-muted">{channel.streaming ? channel.streamInfo.game : 'Offline'}</small>
              </CardSubtitle>
            </CardBody>
            <CardImg className="rounded-0" src={channel.logo} />
            <ListGroup flush={true}>
              <NavLink className="list-group-item rounded-0" activeClassName="active" to={`/user/${channel.name}`} exact>Live</NavLink>
              <NavLink className="list-group-item rounded-0" activeClassName="active" to={`/user/${channel.name}/videos`}>Videos</NavLink>
              <NavLink className="list-group-item rounded-0" activeClassName="active" to={`/user/${channel.name}/clips`}>Clips</NavLink>
              <NavLink className="list-group-item rounded-0" activeClassName="active" to={`/user/${channel.name}/followers`}>Followers</NavLink>
              <NavLink className="list-group-item rounded-0" activeClassName="active" to={`/user/${channel.name}/followed`}>Followed</NavLink>
            </ListGroup>
          </Card>
        </Col>
      );
    }

    return (
      <Container className='h-100 p-0' fluid={true}>
        <Row className="h-100 m-0 no-gutters">
          <Col className={bodyClasses}>{children}</Col>
          {sideBarComponent}
        </Row>
      </Container>
    );
  }
}
