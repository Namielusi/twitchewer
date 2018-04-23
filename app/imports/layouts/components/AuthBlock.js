import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import PersonIcon from '@material-ui/icons/Person';
import { deepPurple200 } from 'material-ui/styles/colors';

// import styles from './AuthBlock.sass';

import MainMenuItem from './MainMenuItem';

class AuthBlock extends Component {
  static propTypes = {
    authorized: PropTypes.bool,
    user: PropTypes.shape(),
  }

  static defaultProps = {
    authorized: false,
    user: {},
  }

  render() {
    const {
      authorized,
      user,
    } = this.props;

    if (authorized) {
      return (
        <Link to="/user">
          <MainMenuItem img={user.logo} title={user.displayName} />
        </Link>
      );
    }

    const oauthLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT}&response_type=token&scope=${process.env.API_SCOPE}`;
    const img = <PersonIcon style={{ width: '100%', height: '100%' }} viewBox="0 0 25 25" color={deepPurple200} />;

    return (
      <a href={oauthLink}>
        <MainMenuItem img={img} title="Sign In" />
      </a>
    );
  }
}

export default AuthBlock;
