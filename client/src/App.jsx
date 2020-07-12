import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/organisms/Header';
import SignUp from './components/organisms/SignUp';
import Login from './components/organisms/Login';
import Classes from './components/organisms/Classes';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

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

  body {
    font-family: 'Poppins', sans-serif;
    color: #222;
  }
`;

const App = () => {
  return (
    <div className='App'>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/classes'>
              <Classes />
            </Route>
            <Redirect from='/' to='/classes' />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
