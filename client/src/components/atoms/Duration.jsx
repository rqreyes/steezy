import React from 'react';
import styled from 'styled-components';

const StyledTime = styled.time`
  width: 80px;
  text-align: ${(props) => props.textAlign || 'left'};
  color: #fff;
`;

const format = (seconds) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());

  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const pad = (string) => {
  return ('0' + string).slice(-2);
};

const Duration = ({ seconds, textAlign }) => {
  return (
    <StyledTime dateTime={`P${Math.round(seconds)}S`} textAlign={textAlign}>
      {format(seconds)}
    </StyledTime>
  );
};

export default Duration;
