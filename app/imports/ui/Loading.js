import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const Loading = ({ text }) => (
  <div className="container-fluid h-100">
    <div className="row align-items-center h-100">
      <div className="col text-center">
        <span className='text-muted'>{text}</span>
      </div>
    </div>
  </div>
);

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: 'Loading...',
};

export default pure(Loading);
