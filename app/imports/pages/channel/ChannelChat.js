import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import _ from 'lodash';

class ChannelChat extends Component {
  static propTypes = {
    time: PropTypes.number,
    chat: PropTypes.object,
  }

  static defaultProps = {
    time: 0,
    chat: {},
  }

  constructor(props) {
    super(props);

    if (props.fetchRecordChat) {
      props.fetchRecordChat(props.channelName, props.videoId, { content_offset_seconds: 0 });
    }
  }

  render() {
    const { time, chat } = this.props;

    const items = _.reduce(chat, (acc, value) => {
      if (_.inRange(value.position, time - 180, time)) {
        acc.push(<li key={value.id} className="list-group-item p-2 bg-light">{value.commenter.display_name}: {value.message}</li>);
      }
      return acc;
    }, []);

    return (<div className="list-group list-group-flush">{items}</div>);
  }
}

export default ChannelChat;
