import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import UserContext from './contexts/UserContext';
import Header from './components/organisms/Header';
import SignUp from './components/organisms/SignUp';
import Login from './components/organisms/Login';
import ClassList from './components/organisms/ClassList';
import ClassVideo from './components/organisms/ClassVideo';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body, input {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
  }

  body {
    color: #222;
    background: #fff;
  }

  main {
    width: 100%;
    max-width: 1140px;
    padding: 0 10px;
    margin: 80px auto 40px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  h1, h2, h3 {
    margin: 0;
  }

  h2 {
    font-size: 30px;
  }

  a, button {
    cursor: pointer;
  }

  ${({ isAuth }) =>
    isAuth &&
    `
    html {
      height: 100%;
    }

    body,
    #root,
    .App {
      min-height: 100%;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #222;
    }

    main {
      margin: 0;
    }
  `}

  /* small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    main {
      margin: 100px auto 40px;
    }
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
  const [userClassData, setUserClassData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const clearUserData = () => setUserData(initialUserData);

  const getMergedRanges = (ranges) => {
    ranges.sort((a, b) => a[0] - b[0]);
    const mergedRanges = [ranges[0]];

    ranges.forEach((range) => {
      const recent = mergedRanges[mergedRanges.length - 1];

      if (range[0] <= recent[1]) recent[1] = Math.max(recent[1], range[1]);
      else mergedRanges.push(range);
    });

    return mergedRanges;
  };

  const getPercentWatched = (ranges, duration) => {
    return Math.round(
      (ranges.reduce(
        (totalSec, range) => (totalSec += Math.abs(range[0] - range[1])),
        0
      ) /
        duration) *
        100
    );
  };

  // update the user class data
  const updateUserClassData = (id, classData) => {
    const userClassDataCopy = _.cloneDeep(userClassData);

    if (userClassDataCopy[id]) {
      const videoDataCopy = userClassDataCopy[id];
      const mergedRangesTotal = getMergedRanges([
        ...videoDataCopy.ranges,
        ...classData.ranges,
      ]);

      videoDataCopy.duration = classData.duration;
      videoDataCopy.percentWatched = getPercentWatched(
        mergedRangesTotal,
        classData.duration
      );
      videoDataCopy.played = classData.played;
      videoDataCopy.ranges = mergedRangesTotal;
      videoDataCopy.timeTotalWatched += classData.timeTotalWatched;
    } else {
      userClassDataCopy[id] = {};
      userClassDataCopy[id]['duration'] = classData.duration;
      userClassDataCopy[id]['percentWatched'] = getPercentWatched(
        classData.ranges,
        classData.duration
      );
      userClassDataCopy[id]['played'] = classData.played;
      userClassDataCopy[id]['ranges'] = [...classData.ranges];
      userClassDataCopy[id]['timeTotalWatched'] = classData.timeTotalWatched;
    }

    setUserClassData(userClassDataCopy);
  };

  // check and verify if user is still logged in
  useEffect(() => {
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
      <GlobalStyle isAuth={isAuth} />
      <UserContext.Provider
        value={{
          userData,
          setUserData,
          clearUserData,
          userClassData,
          updateUserClassData,
          setIsAuth,
        }}
      >
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
            <Route path='/classes/:id'>
              <ClassVideo />
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
