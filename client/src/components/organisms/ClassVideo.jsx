import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Slider from 'rc-slider';
import UserContext from '../../contexts/UserContext';
import Duration from '../atoms/Duration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

const StyledMain = styled.main`
  height: calc(100vh - 60px);
  max-width: none;
  margin: 60px 0 0;
  position: relative;

  .react-player {
    > div {
      display: flex;
    }
  }
`;

const StyledSettings = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledProgress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  .rc-slider {
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
`;

const StyledPlayPause = styled.button`
  color: #fff;
  background: none;
  border: 0;
  margin: 0 0 30px 30px;

  svg {
    font-size: 30px;
  }
`;

const ClassVideo = () => {
  const { setUserData } = useContext(UserContext);
  const [settings, setSettings] = useState({
    playing: true,
    played: 0,
    loaded: 0,
    seeking: false,
    duration: 0,
  });
  const history = useHistory();
  let player1 = [];

  const handlePlayPause = () => {
    setSettings({ ...settings, playing: !settings.playing });
  };

  const handleSeekMouseDown = () => {
    setSettings({ ...settings, seeking: true });
  };

  const handleSeekChange = (value) => {
    setSettings({ ...settings, played: parseFloat(value) });
  };

  const handleSeekMouseUp = (value) => {
    setSettings({ ...settings, seeking: false });
    player1.seekTo(parseFloat(value));
  };

  const handleProgress = (state) => {
    if (!settings.seeking) {
      setSettings({ ...settings, ...state });
    }
  };

  const handleDuration = (duration) => {
    setSettings({ ...settings, duration });
  };

  const playPauseDisplay = settings.playing ? (
    <FontAwesomeIcon icon={faPause} />
  ) : (
    <FontAwesomeIcon icon={faPlay} />
  );

  useEffect(() => {
    // check and verify if user is still logged in
    (async () => {
      const token = localStorage.getItem('auth-token');

      if (token) {
        const tokenRes = await axios.post('/user/tokenverify', null, {
          headers: { 'x-auth-token': token },
        });

        if (tokenRes.data) setUserData({ token, user: tokenRes.data });
        else history.push('/login');
      } else {
        history.push('/login');
      }
    })();
  }, [setUserData, history]);

  return (
    <StyledMain>
      <ReactPlayer
        ref={(player) => {
          player1 = player;
        }}
        className='react-player'
        url={`${history.location.state.videoUrl}`}
        width='100%'
        height='100%'
        playing={settings.playing}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <StyledSettings>
        <StyledProgress>
          <Duration
            seconds={settings.duration * settings.played}
            textAlign={'right'}
          />
          <Slider
            min={0}
            max={1}
            step={0.001}
            value={settings.played}
            onBeforeChange={handleSeekMouseDown}
            onChange={handleSeekChange}
            onAfterChange={handleSeekMouseUp}
            railStyle={{ height: 8, background: 'rgba(255, 255, 255, 0.4' }}
            handleStyle={{
              display: 'none',
            }}
            trackStyle={{
              height: 8,
              background: '#fff',
            }}
          />
          <Duration seconds={settings.duration * (1 - settings.played)} />
        </StyledProgress>
        <StyledPlayPause onClick={handlePlayPause}>
          {playPauseDisplay}
        </StyledPlayPause>
      </StyledSettings>
    </StyledMain>
  );
};

export default ClassVideo;
