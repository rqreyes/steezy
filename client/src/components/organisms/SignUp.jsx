import React, { useContext, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Error from '../atoms/Error';
import LogoText from '../../images/logo-text.png';

const SignUp = () => {
  const { setUserData } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const errorDisplay = error ? (
    <Error error={error} setError={setError} />
  ) : null;

  const userValidate = async (evt) => {
    evt.preventDefault();

    // validate the user signup
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post('/user/signup', loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/classes');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

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
        />
        <Button type='submit'>Create Account</Button>
      </form>
      {errorDisplay}
    </Fragment>
  );
};

export default SignUp;
