import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid #cbcecf;
  border-radius: 4px;
  padding: 9px 14px;
  margin-bottom: 14px;
`;

const Button = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Button;
