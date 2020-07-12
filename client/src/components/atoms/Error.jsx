import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: firebrick;
  margin-bottom: 10px;

  p {
    margin-right: 10px;
  }
`;

const StyledButton = styled(Button)`
  width: 20px;
  height: 20px;
  background: none;
  padding: 0;

  svg {
    width: 20px !important;
    height: 20px;
    color: firebrick;
  }
`;

const Error = ({ error, setError }) => {
  return (
    <StyledError>
      <p>{error}</p>
      <StyledButton onClick={() => setError('')}>
        <FontAwesomeIcon icon={faMinusCircle} />
      </StyledButton>
    </StyledError>
  );
};

export default Error;
