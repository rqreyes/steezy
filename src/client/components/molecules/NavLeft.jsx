import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../images/logo-icon.svg';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  align-items: stretch;

  a {
    display: flex;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  &:hover {
    box-shadow: inset 0 5px #ebefef;
  }

  a {
    height: 100%;
    font-size: 9px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    color: #222;
  }
`;

const NavLeft = () => {
  return (
    <StyledNav>
      <Link to='/'>
        <h1>Steezy</h1>
        <img src={LogoIcon} alt='logo icon' />
      </Link>
      <StyledDiv>
        <Link to='/classes'>Classes</Link>
      </StyledDiv>
    </StyledNav>
  );
};

export default NavLeft;
