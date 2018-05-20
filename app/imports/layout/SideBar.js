import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

class SideBar extends Component {
  static propTypes = {
    style: PropTypes.object,
    hideSideBar: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    style: {},
    hideSideBar: false,
  };

  render() {
    const {
      style, hideSideBar, children,
    } = this.props;

    if (hideSideBar) {
      return null;
    }

    return (
      <div
        className="col-5 col-lg-3 col-xl-2 mw-100 h-100 p-0 border-left bg-light overflow-y-hidden"
        style={style}
      >{children}</div>
    );
  }
}

export default pure(SideBar);
