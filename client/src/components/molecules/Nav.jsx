import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledLogin = styled.button`
  height: 60px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: #ebefef;
  padding: 0 32px;
  border: 0;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #0b79fb;
  }
`;

const StyledSignUp = styled(StyledLogin)`
  color: #fff;
  background: #0b79fb;
`;

const Nav = () => {
  return (
    <StyledNav>
      <Link to='/login'>
        <StyledLogin type='button'>Login</StyledLogin>
      </Link>
      <Link to='/signup'>
        <StyledSignUp type='button'>Sign-Up</StyledSignUp>
      </Link>
    </StyledNav>
  );
};

export default Nav;
