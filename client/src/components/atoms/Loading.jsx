import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
  width: 100px;
  height: 100px;
  margin: auto;
  position: relative;
  animation: chase 2.5s infinite linear both;

  .chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: chase-dot 2s infinite ease-in-out both;

    &::before {
      content: '';
      display: block;
      width: 25%;
      height: 25%;
      background-color: #0b79fb;
      border-radius: 100%;
      animation: chase-dot-before 2s infinite ease-in-out both;
    }

    &:nth-child(1) {
      animation-delay: -1.1s;

      &:before {
        animation-delay: -1.1s;
      }
    }
    &:nth-child(2) {
      animation-delay: -1s;

      &:before {
        animation-delay: -1s;
      }
    }
    &:nth-child(3) {
      animation-delay: -0.9s;

      &:before {
        animation-delay: -0.9s;
      }
    }
    &:nth-child(4) {
      animation-delay: -0.8s;

      &:before {
        animation-delay: -0.8s;
      }
    }
    &:nth-child(5) {
      animation-delay: -0.7s;

      &:before {
        animation-delay: -0.7s;
      }
    }
    &:nth-child(6) {
      animation-delay: -0.6s;

      &:before {
        animation-delay: -0.6s;
      }
    }
  }

  @keyframes chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;

const Loading = () => {
  return (
    <StyledLoading className='chase'>
      <div className='chase-dot'></div>
      <div className='chase-dot'></div>
      <div className='chase-dot'></div>
      <div className='chase-dot'></div>
      <div className='chase-dot'></div>
      <div className='chase-dot'></div>
    </StyledLoading>
  );
};

export default Loading;
