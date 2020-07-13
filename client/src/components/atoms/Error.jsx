import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  color: firebrick;
  margin-bottom: 10px;

  p {
    margin-right: 4px;
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
      <p className='error'>{error}</p>
      <StyledButton onClick={() => setError('')}>
        <FontAwesomeIcon icon={faTimes} />
      </StyledButton>
    </StyledError>
  );
};

export default Error;
