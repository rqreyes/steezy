import React from 'react';
import styled from 'styled-components';
import LogoLoading from '../../images/logo-loading.gif';

const StyledLoading = styled.div`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #232323;
  position: fixed;
  top: 100vh;
  left: 0;
  z-index: 2;
  transition: all 2s ease-out 1s;

  img {
    width: 100%;
    max-width: 600px;
  }

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 1;
    top: 0;
  `}
`;

const Loading = ({ isLoading }) => {
  return (
    <StyledLoading isLoading={isLoading}>
      <img src={LogoLoading} alt='loading' />
    </StyledLoading>
  );
};

export default Loading;
