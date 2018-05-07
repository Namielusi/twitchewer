import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const Body = ({ style, children }) => (
  <div className="col h-100 p-0 bg-white" style={style}>{children}</div>
);

Body.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Body.defaultProps = {
  style: {},
};

export default pure(Body);
