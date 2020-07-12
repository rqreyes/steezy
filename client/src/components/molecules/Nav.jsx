import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to='/signup'>
        <button type='button'>Sign Up</button>
      </Link>
      <Link to='/login'>
        <button type='button'>Log In</button>
      </Link>
    </nav>
  );
};

export default Nav;
