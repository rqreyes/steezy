import React, { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './components/organisms/Header';
import SignUp from './components/organisms/SignUp';
import Login from './components/organisms/Login';
import Classes from './components/organisms/Classes';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body,
  #root,
  .App {
    min-height: 100%;
  }

  body, input {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    background: #222;
  }
`;

const StyledSignUp = styled.main`
  width: 392px;
  background: #fff;
  padding: 24px;
  border-radius: 5px;

  img {
    display: block;
    margin: 0 auto 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  p {
    text-align: center;
    margin: 0;

    &.error {
      margin-right: 10px;
    }
  }

  a {
    text-decoration: none;
    color: #0a78fb;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledLogin = styled(StyledSignUp)`
  padding-bottom: 10px;

  form {
    margin-bottom: 30px;
  }
`;

const App = () => {
  const initialUserData = { token: '', user: {} };
  const [userData, setUserData] = useState(initialUserData);
  const clearUserData = () => setUserData(initialUserData);

  useEffect(() => {
    // check and verify if user is still logged in
    const tokenVerify = async () => {
      const token = localStorage.getItem('auth-token');

      if (token) {
        const tokenRes = await axios.post('/user/tokenverify', null, {
          headers: { 'x-auth-token': token },
        });

        if (tokenRes.data) setUserData({ token, user: tokenRes.data });
      }
    };

    tokenVerify();
  }, []);

  return (
    <div className='App'>
      <GlobalStyle />
      <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/signup'>
              <StyledSignUp>
                <SignUp />
              </StyledSignUp>
            </Route>
            <Route path='/login'>
              <StyledLogin>
                <Login />
              </StyledLogin>
            </Route>
            <Route path='/classes'>
              <Classes />
            </Route>
            <Redirect from='/' to='/classes' />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
