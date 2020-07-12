import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 60px;
  font-size: 9px;
  border-radius: 0;
`;

const StyledLogin = styled(StyledButton)`
  color: #222;
  background: #ebefef;

  &:hover {
    color: #fff;
    background: #0b79fb;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <Link to='/login'>
        <StyledLogin type='button'>Login</StyledLogin>
      </Link>
      <Link to='/signup'>
        <StyledButton type='button'>Sign-Up</StyledButton>
      </Link>
    </StyledNav>
  );
};

export default Nav;
