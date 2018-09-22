import * as React from 'react';
import { Link } from 'react-router-dom';

export default ({ pathname }: { pathname?: string }) => (
  <header>
    <Link to="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>{' '}
    <Link to="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
  </header>
);
