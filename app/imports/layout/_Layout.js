import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
// import _ from 'lodash';

import { Container, Row, Col } from 'reactstrap';

// import api from 'Lib/api';

import { initialData as initialDataAction } from 'Actions';
import 'nprogress/nprogress.css';
import styles from './Layout.sass';

import Loading from './components/Loading';
import MainMenu from './components/MainMenu';

class Layout extends Component {
  static propTypes = {
    component: PropTypes.element.isRequired,
    history: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool,
    accessToken: PropTypes.string,
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    loading: false,
    accessToken: null,
    user: {},
    channels: [],
  }

  async componentWillMount() {
    const {
      user,
      accessToken,
      fetchInitialData,
    } = this.props;

    if (accessToken && !user.id) {
      fetchInitialData(accessToken);
    }
  }

  render() {
    const {
      component: ChildComponent,
      history,
      location,
      match,
      loading,
      user,
      channels,
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    const containerClasses = classnames(styles.container, 'h-100');

    return (
      <Container className={containerClasses} fluid={true}>
        <Row className="h-100" noGutters={true}>
          <Col className={styles.leftBar} xs="2">
            <MainMenu className="h-100 rounded-0 border-left-0 border-top-0 border-bottom-0" user={user} channels={channels} />
          </Col>
          <Col className={styles.body}>
            <ChildComponent history={history} location={location} match={match} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ root: state }) => ({
  loading: state.loading,
  accessToken: state.accessToken,
  user: state.user,
  channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  fetchInitialData: token => dispatch(initialDataAction.request(token)),
  // updateLoading: data => dispatch(updateLoadingAction(data)),
  // updateUserInfo: data => dispatch(updateUserInfoAction(data)),
  // updateChannelList: data => dispatch(updateChannelListAction(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
