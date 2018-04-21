import React from 'react';
import Link from 'react-router-dom/Link';

import styles from './Logo.sass';

const Logo = () => (
  <Link to='/'>
    <img className={styles.logo} />
  </Link>
);

export default Logo;
