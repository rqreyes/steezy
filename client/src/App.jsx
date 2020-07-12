import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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

const StyledMainForm = styled.main`
  width: 392px;
  background: #fff;
  padding: 24px 24px 10px 24px;
  border-radius: 5px;

  img {
    display: block;
    margin: 0 auto 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto 30px;
  }

  p {
    margin: 0 10px 0 0;
  }

  a {
    text-decoration: none;
    color: #0a78fb;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const App = () => {
  return (
    <div className='App'>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/login'>
            <StyledMainForm>
              <Login />
            </StyledMainForm>
          </Route>
          <Route path='/signup'>
            <StyledMainForm>
              <SignUp />
            </StyledMainForm>
          </Route>
          <Route path='/classes'>
            <Classes />
          </Route>
          <Redirect from='/' to='/classes' />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
