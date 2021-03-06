import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { profile as profileAction } from 'Actions';
import './Layout.sass';

import Loading from './components/Loading';
import Menu from './components/Menu';

const Layout = class Layout extends Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    channels: PropTypes.object,
    channelsOrder: PropTypes.array,
    profile: PropTypes.object,
    hideMenu: PropTypes.bool,
    hideSideBar: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    channels: {},
    channelsOrder: [],
    profile: {},
    hideMenu: false,
    hideSideBar: false,
  }

  async componentWillMount() {
    const {
      profile,
      accessToken,
      fetchProfileData,
    } = this.props;

    if (accessToken && !profile.id) {
      fetchProfileData(accessToken);
    }
  }

  render() {
    const {
      accessToken,
      channels,
      channelsOrder,
      profile,
      hideMenu,
      hideSideBar,
      children,
    } = this.props;

    const style = {
      overflowX: 'hidden',
      overflowY: 'auto',
    };

    if (!profile.id && accessToken) {
      return <Loading />;
    }

    const childrenProps = {
      style,
      hideSideBar,
      hideMenu,
    };

    const childrenEx = React.Children.map(children, component => (
      React.cloneElement(component, childrenProps)
    ));

    return (
      <div className="container-fluid h-100 mh-100">
        <div className="row flex-column flex-lg-row h-100">
          <Menu
            channels={channels}
            channelsOrder={channelsOrder}
            profile={profile}
            {...childrenProps}
          />
          {childrenEx}
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ root: state }) => ({
  accessToken: state.accessToken,
  profile: state.profile,
  channels: state.channels,
  channelsOrder: state.channelsOrder,
});

const mapDispatchToProps = dispatch => ({
  fetchProfileData: token => dispatch(profileAction.request(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
