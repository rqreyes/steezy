import React, { Fragment } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Error from '../atoms/Error';
import LogoText from '../../images/logo-text.png';
import styled from 'styled-components';

const StyledP = styled.p`
  text-align: center;
  margin: 0;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const errorDisplay = error ? (
    <Error error={error} setError={setError} />
  ) : null;

  const userValidate = async (evt) => {
    evt.preventDefault();
    try {
      // validate the user login
      const loginUser = { email, password };
      const loginRes = await axios.post('/login', loginUser);

      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/classes');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <Fragment>
      <img src={LogoText} alt='logo text' />
      {errorDisplay}
      <form onSubmit={userValidate}>
        <Input
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <Button type='submit'>Log In</Button>
      </form>
      <StyledP>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </StyledP>
    </Fragment>
  );
};

export default Login;
