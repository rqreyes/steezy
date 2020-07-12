import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../molecules/Nav';
import LogoIcon from '../../images/logo-icon.svg';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 3px solid #ebefef;

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
