import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

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

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidUpdate() {
    if (this.listNode.scrollHeight <= this.listNode.scrollTop + this.listNode.offsetHeight + 200) {
      this.listNode.scrollTo(0, this.listNode.scrollHeight);
    }
  }

  sendMessage(event) {
    event.preventDefault();

    alert('The ability to send messages is currently in development stage');
  }

  render() {
    const { time, chat } = this.props;

    const items = _.reduce(chat, (acc, value) => {
      if (_.inRange(value.position, time - 180, time)) {
        const commentStyle = { lineHeight: '1rem', wordWrap: 'break-word' };
        const commentNameStyle = { color: value.commenter.color };
        acc.push((<li key={value.id} className="list-group-item p-2 bg-light" style={commentStyle}>
          <small>
            <span className="font-weight-bold" style={commentNameStyle}>{value.commenter.display_name}</span>: {value.message}
          </small>
        </li>));
      }

      return acc;
    }, []);

    return (
      <div className="d-flex flex-column h-100">
        <div className="list-group list-group-flush h-100 overflow-y-auto" ref={(node) => { this.listNode = node; }}>{items}</div>
        <form onSubmit={this.sendMessage}>
          <div className="input-group input-group-md border-top">
            <input type="text" className="form-control border-right-1" style={{ boxShadow: 'none' }} placeholder="Post a message" aria-label="Post a message" />
            <div className="input-group-append">
              <button className="btn btn-primary border-0 rounded-0" style={{ boxShadow: 'none' }} type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ChannelChat;
