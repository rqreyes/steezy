import React from 'react';

const Error = ({ error, setError }) => {
  return (
    <div>
      <p>{error}</p>
      <button onClick={() => setError('')}>X</button>
    </div>
  );
};

export default Error;
