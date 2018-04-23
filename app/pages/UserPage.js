/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import axios from 'axios';

class UserPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
  }

  static defaultProps = {
    user: {},
  }

  constructor(props) {
    super();

    this.state = {
      user: props.user,
    };
  }

  // async componentWillMount() {
  //   const { data } = await axios.get('https://api.twitch.tv/kraken/user', {
  //     headers: {
  //       'Client-ID': '07iih8401gr5s8v1h9rps7rsa0son4',
  //       Authorization: 'OAuth z2obeig1zclnezmzgovfngu03mypi2',
  //     },
  //   });
  //
  //   this.setState({
  //     userInfo: {
  //       id: data._id, // eslint-disable-line
  //       nickname: data.display_name,
  //     },
  //   });
  // }

  render() {
    const {
      user: {
        id,
        displayName,
      },
    } = this.state;

    return (
      <div>
        ID: {id}<br />
        Nickname: {displayName}<br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(UserPage);
