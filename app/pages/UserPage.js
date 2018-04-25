/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
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
  Badge,
} from 'reactstrap';
import _ from 'lodash';

class UserPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    user: {},
    channels: {},
  }

  static async fetchData(location, store) {

  }

  constructor(props) {
    super(props);

    this.state = {
      profile: {
        name: '',
        displayName: '',
      },
    };
  }

  componentWillMount() {
    const {
      user,
      channels,
      computedMatch,
    } = this.props;

    const isProfile = user.name === computedMatch.params.name;
    if (isProfile) {
      this.setState({ profile: user });
    } else {
      this.setState({ profile: _.find(channels, { name: computedMatch.params.name }) });
    }
  }

  render() {
    const { profile } = this.state;

    if (!profile) {
      return <div />;
    }

    return (
      <Container className="h-100 pr-0" fluid={true}>
        <Row className="h-100 no-gutters">
          <Col>
            <Row>Body</Row>
          </Col>
          <Col className="mh-100 border border-top-0 border-right-0 border-bottom-0" xs="2">
            <Card className="rounded-0 border-0">
              <CardBody>
                <CardTitle>{profile.displayName}</CardTitle>
                <CardSubtitle>{profile.streaming ? profile.streamInfo.game : 'Offline'}</CardSubtitle>
              </CardBody>
              <CardImg className="rounded-0" src={profile.logo} />
              <ListGroup flush={true}>
                <Link className="list-group-item rounded-0" to={`${profile.name}/live`}>Live</Link>
                <Link className="list-group-item rounded-0" to={`${profile.name}/videos`}>Videos</Link>
                <Link className="list-group-item rounded-0" to={`${profile.name}/clips`}>Clips</Link>
                <Link className="list-group-item rounded-0" to={`${profile.name}/followers`}>Followers</Link>
                <Link className="list-group-item rounded-0" to={`${profile.name}/followed`}>Followed</Link>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ root: state }) => ({
  user: state.user,
  channels: state.channels,
});

export default connect(mapStateToProps, null)(UserPage);
