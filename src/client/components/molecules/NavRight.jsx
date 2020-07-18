import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
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
  const { userData, clearUserData } = useContext(UserContext);

  // on logout, remove the token
  const logout = () => {
    clearUserData();
    localStorage.removeItem('auth-token');
  };

  // depending on if they have a token or not, display either logout or login buttons
  const navDisplay = userData.token ? (
    <StyledNav>
      <Link to='/classes'>
        <StyledLogin type='button' onClick={logout}>
          Logout
        </StyledLogin>
      </Link>
    </StyledNav>
  ) : (
    <StyledNav>
      <Link to='/login'>
        <StyledLogin type='button'>Login</StyledLogin>
      </Link>
      <Link to='/signup'>
        <StyledButton type='button'>Sign-Up</StyledButton>
      </Link>
    </StyledNav>
  );

  return navDisplay;
};

export default Nav;
