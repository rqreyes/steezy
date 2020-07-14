import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  background: #0b79fb;
  padding: 16px 32px;
  border: 0;
  border-radius: 4px;
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
