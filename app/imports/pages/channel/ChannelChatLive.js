import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

class ChannelChatLive extends Component {
  static propTypes = {
    channel: PropTypes.object,
  }

  static defaultProps = {
    channel: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      chat: [],
    };

    this.websocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');

    this.onSocketOpen = this.onSocketOpen.bind(this);
    this.onSocketClose = this.onSocketClose.bind(this);
    this.onSocketError = this.onSocketError.bind(this);
    this.onSocketMessage = this.onSocketMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.websocket.onopen = this.onSocketOpen;
    this.websocket.onclose = this.onSocketClose;
    this.websocket.onerror = this.onSocketError;
    this.websocket.onmessage = this.onSocketMessage;
  }

  componentDidUpdate(prevProps) {
    if (this.listNode.scrollHeight <= this.listNode.scrollTop + this.listNode.offsetHeight + 200) {
      this.listNode.scrollTo(0, this.listNode.scrollHeight);
    }

    if (this.props.channel.id !== prevProps.channel.id) {
      this.websocket.close();

      this.websocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');
      this.websocket.onopen = this.onSocketOpen;
      this.websocket.onclose = this.onSocketClose;
      this.websocket.onerror = this.onSocketError;
      this.websocket.onmessage = this.onSocketMessage;
    }
  }

  onSocketOpen() {
    const { channel } = this.props;

    if (channel.name && this.websocket !== null && this.websocket.readyState === 1) {
      console.log('Connecting and authenticating...');

      const password = 'oauth:8zaai3i0gf08ulpzhogmi770vcun2j';
      const username = 'namielusis';

      this.websocket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      this.websocket.send(`PASS ${password}`);
      this.websocket.send(`NICK ${username}`);
      this.websocket.send(`JOIN #${channel.name}`);
    }
  }

  onSocketClose() {
    console.log('Disconnected from the chat server.');
  }

  onSocketError(err) {
    console.error('[WebSoketError::Error]', err);
  }

  onSocketMessage(message) {
    if (message !== null) {
      const parsed = this.parseSocketMessage(message.data);
      if (parsed !== null) {
        // console.log('[WebSoketError::Message]', parsed, '\n\n');

        switch (parsed.command) {
          case 'PING': { this.websocket.send(`PONG : ${parsed.message}`); break; }
          case 'PRIVMSG': {
            const item = {
              id: parsed.tags.id,
              position: _.round(_.now() / 1000),
              commenter: {
                id: parseInt(parsed.tags['user-id'], 10),
                name: parsed.username,
                display_name: parsed.tags['display-name'],
                color: parsed.tags.color && parsed.tags.color.length > 0 ?
                  parsed.tags.color : `rgb(${_.random(0, 255)}, ${_.random(0, 255)}, ${_.random(0, 255)})`,
              },
              message: parsed.message,
              created_at: _.round(parsed.tags['tmi-sent-ts'] / 1000),
            };
            this.setState({
              chat: [...this.state.chat, item],
            });
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }

  parseSocketMessage(rawMessage) {
    const parsedMessage = {
      message: null,
      tags: null,
      command: null,
      original: rawMessage,
      channel: null,
      username: null,
    };

    if (rawMessage[0] === '@') {
      const tagIndex = rawMessage.indexOf(' ');
      const userIndex = rawMessage.indexOf(' ', tagIndex + 1);
      const commandIndex = rawMessage.indexOf(' ', userIndex + 1);
      const channelIndex = rawMessage.indexOf(' ', commandIndex + 1);
      const messageIndex = rawMessage.indexOf(':', channelIndex + 1);

      parsedMessage.tags = rawMessage.slice(0, tagIndex)
        .split(';')
        .reduce((acc, value) => {
          const [key, data] = value.split('=');
          acc[key] = data;
          return acc;
        }, {});
      parsedMessage.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'));
      parsedMessage.command = rawMessage.slice(userIndex + 1, commandIndex);
      parsedMessage.channel = rawMessage.slice(commandIndex + 1, channelIndex);
      parsedMessage.message = rawMessage.slice(messageIndex + 1);
    } else if (rawMessage.startsWith('PING')) {
      parsedMessage.command = 'PING';
      [parsedMessage.message] = rawMessage.split(':');
    }

    return parsedMessage;
  }

  sendMessage(event) {
    event.preventDefault();

    alert('The ability to send messages is currently in development stage');
  }

  render() {
    const { chat } = this.state;
    const time = _.round(_.now() / 1000);

    const items = _.reduce(chat, (acc, item) => {
      if (_.inRange(item.position, time - 180, time + 0.1)) {
        const commentStyle = { lineHeight: '1rem', wordWrap: 'break-word' };
        const commentNameStyle = { color: item.commenter.color };

        acc.push((
          <li key={item.id} className="list-group-item p-2 bg-light" style={commentStyle}>
            <small>
              <span className="font-weight-bold" style={commentNameStyle}>{item.commenter.display_name}</span>: {item.message}
            </small>
          </li>
        ));
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

export default ChannelChatLive;
