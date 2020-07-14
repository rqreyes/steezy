import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from './contexts/UserContext';
import Header from './components/organisms/Header';
import SignUp from './components/organisms/SignUp';
import Login from './components/organisms/Login';
import ClassList from './components/organisms/ClassList';
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
    /* display: flex;
    justify-content: center;
    align-items: center; */
    color: #222;
    /* background: #222; */
    background: #fff;
  }

  main {
    max-width: 1200px;
    margin: 60px auto 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  h1, h2, h3 {
    margin: 0;
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
`;

const App = () => {
  const initialUserData = { token: '', user: {} };
  const [userData, setUserData] = useState(initialUserData);
  const clearUserData = () => setUserData(initialUserData);

  useEffect(() => {
    // check and verify if user is still logged in
    (async () => {
      const token = localStorage.getItem('auth-token');

      if (token) {
        const tokenRes = await axios.post('/user/tokenverify', null, {
          headers: { 'x-auth-token': token },
        });

        if (tokenRes.data) setUserData({ token, user: tokenRes.data });
      }
    })();
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
              <ClassList />
            </Route>
            <Redirect from='/' to='/classes' />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
