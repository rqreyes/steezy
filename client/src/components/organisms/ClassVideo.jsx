import React, { useContext, useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
  padding: 0;
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
  const { setUserData, updateUserClassData } = useContext(UserContext);
  const [settings, setSettings] = useState({
    playing: true,
    played: 0,
    loaded: 0,
    seeking: false,
    duration: 0,
  });
  const [ranges, setRanges] = useState([]);
  const [time1, setTime1] = useState({});
  const history = useHistory();
  const { id } = useParams();
  let player1 = [];
  const sliderRef = useRef();

  const handlePlay = () => {
    handleRangeStart(sliderRef.current.state.value * settings.duration);
    setSettings({ ...settings, playing: true });
  };

  const handlePause = () => {
    handleRangeEnd();
    setSettings({ ...settings, playing: false });
  };

  const handlePlayPause = () => {
    setSettings({ ...settings, playing: !settings.playing });
  };

  const handleSeekMouseDown = (value) => {
    // if the video is playing while seeking, then end that range
    if (settings.playing) handleRangeEnd(value * settings.duration);
    setSettings({ ...settings, seeking: true });
  };

  const handleSeekChange = (value) => {
    setSettings({ ...settings, played: parseFloat(value), seeking: true });
  };

  const handleSeekMouseUp = (value) => {
    setSettings({ ...settings, seeking: false });
    player1.seekTo(parseFloat(value));
  };

  const handleProgress = (state) => {
    if (!settings.seeking) setSettings({ ...settings, ...state });
  };

  const handleDuration = (duration) => {
    setSettings({ ...settings, duration });
  };

  const handleRangeStart = (playStart) => {
    setRanges([...ranges, [Math.floor(playStart)]]);
  };

  const handleRangeEnd = (playEnd) => {
    const rangeCopy = [...ranges];

    if (playEnd) rangeCopy[rangeCopy.length - 1].push(Math.floor(playEnd));
    else
      rangeCopy[rangeCopy.length - 1].push(Math.floor(settings.playedSeconds));

    setRanges(rangeCopy);

    // store class data into user context
    const time2 = new Date();
    const timeTotalWatched = Math.abs(time1 - time2);

    updateUserClassData(id, {
      percentWatched: getPercentWatched(ranges),
      played: settings.played,
      ranges,
      timeTotalWatched,
    });
  };

  const getPercentWatched = (ranges) => {
    ranges.sort((a, b) => a[0] - b[0]);
    const mergedRanges = [ranges[0]];

    ranges.forEach((range) => {
      const recent = mergedRanges[mergedRanges.length - 1];

      if (range[0] <= recent[1]) recent[1] = Math.max(recent[1], range[1]);
      else mergedRanges.push(range);
    });

    return Math.round(
      (mergedRanges.reduce(
        (totalSec, range) => (totalSec += Math.abs(range[0] - range[1])),
        0
      ) /
        settings.duration) *
        100
    );
  };

  const playPauseDisplay = settings.playing ? (
    <FontAwesomeIcon icon={faPause} />
  ) : (
    <FontAwesomeIcon icon={faPlay} />
  );

  // check and verify if user is still logged in
  useEffect(() => {
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

  // initialize start time
  useEffect(() => {
    const timeStart = new Date();
    setTime1(timeStart);
  }, []);

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
        onPlay={handlePlay}
        onPause={handlePause}
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
            ref={sliderRef}
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
