import React from 'react';
import NavLeft from '../molecules/NavLeft';
import NavRight from '../molecules/NavRight';
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
      <NavLeft />
      <NavRight />
    </StyledHeader>
  );
};

export default Header;
