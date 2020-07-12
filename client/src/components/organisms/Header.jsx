import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../molecules/Nav';
import LogoIcon from '../../images/logo-icon.svg';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: inset 0 -3px #ebefef;
  position: fixed;
  top: 0;
  left: 0;

  > a,
  img {
    height: 60px;
  }

  h1 {
    margin: 0;
    text-indent: -9999px;
    position: absolute;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to='/'>
        <h1>Steezy</h1>
        <img src={LogoIcon} alt='logo icon' />
      </Link>
      <Nav />
    </StyledHeader>
  );
};

export default Header;
