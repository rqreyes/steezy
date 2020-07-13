import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgb(235, 90, 70);
  background: rgba(235, 90, 70, 0.1);
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  width: 20px;
  height: 20px;
  background: none;
  padding: 0;

  svg {
    width: 20px !important;
    height: 20px;
    color: rgb(235, 90, 70);
  }
`;

const StyledP = styled.p`
  padding: 0 10px;
`;

const Error = ({ error, setError }) => {
  return (
    <StyledError onClick={() => setError('')}>
      <StyledButton>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </StyledButton>
      <StyledP>{error}</StyledP>
      <StyledButton>
        <FontAwesomeIcon icon={faTimes} />
      </StyledButton>
    </StyledError>
  );
};

export default Error;
