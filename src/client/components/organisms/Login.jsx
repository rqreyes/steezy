import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import LogoText from '../../images/logo-text.png';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Error from '../atoms/Error';

const StyledP = styled.p`
  && {
    margin-top: 30px;
  }
`;

const Login = () => {
  const { setUserData, setIsAuth } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const errorDisplay = error ? (
    <Error error={error} setError={setError} />
  ) : null;

  const userValidate = async (evt) => {
    evt.preventDefault();

    // validate the user login
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post('/user/login', loginUser);

      setUserData({
        token: loginRes.data.token,
        userId: loginRes.data.userId,
        classEntries: loginRes.data.classEntries,
      });

      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/classes');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // update the body color
  useEffect(() => {
    setIsAuth(true);

    return () => setIsAuth(false);
  }, [setIsAuth]);

  return (
    <Fragment>
      <img src={LogoText} alt='logo text' />
      <form onSubmit={userValidate}>
        <Input
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required
          error={error}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
          error={error}
        />
        <Button type='submit'>Log In</Button>
      </form>
      {errorDisplay}
      <StyledP>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </StyledP>
    </Fragment>
  );
};

export default Login;
