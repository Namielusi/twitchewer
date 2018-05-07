import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const SideBar = ({ style, hideSideBar, children }) => {
  if (hideSideBar) {
    return null;
  }

  return (
    <div className="col col-lg-3 col-xl-2 h-100 border-left bg-light" style={style}>{children}</div>
  );
};

SideBar.propTypes = {
  style: PropTypes.object,
  hideSideBar: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

SideBar.defaultProps = {
  style: {},
  hideSideBar: false,
};

export default pure(SideBar);
