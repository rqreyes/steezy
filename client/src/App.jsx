import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/organisms/Header';
import SignUp from './components/organisms/SignUp';
import Login from './components/organisms/Login';
import Classes from './components/organisms/Classes';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
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
