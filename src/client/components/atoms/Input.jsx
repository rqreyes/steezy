import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #cbcecf;
  border-radius: 4px;
  padding: 9px 14px;
  margin-bottom: 14px;

  &.error {
    border-color: rgb(235, 90, 70);
  }
`;

const Button = ({ error, ...props }) => {
  const inputClass = error ? 'error' : '';

  return <StyledInput className={inputClass} {...props} />;
};

export default Button;
