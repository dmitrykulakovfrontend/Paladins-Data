import React from 'react';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CachedIcon from '@mui/icons-material/Cached';
import { useState, useEffect, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';

const TopPanel = (props) => {
  const [activeIcon1, setActiveIcon1] = useState(true);
  const [activeIcon2, setActiveIcon2] = useState(false);
  const [timeBeforeUpdate, setTimeBeforeUpdate] = useState({});

  const handleIconClick1 = () => {
    setActiveIcon1(true);
    setActiveIcon2(false);
  };

  const handleIconClick2 = () => {
    setActiveIcon1(false);
    setActiveIcon2(true);
  };

  const calculateTimeLeft = (date) => {
    const difference = +new Date(date) + 30 * 60 * 1000 - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes:
          Math.floor((difference / 1000 / 60) % 60) < 10
            ? '0' + Math.floor((difference / 1000 / 60) % 60)
            : Math.floor((difference / 1000 / 60) % 60),
        seconds:
          Math.floor((difference / 1000) % 60) < 10
            ? '0' + Math.floor((difference / 1000) % 60)
            : Math.floor((difference / 1000) % 60),
        title: new Date(date).toUTCString(),
      };
      return timeLeft;
    }
    timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      title: new Date(date).toUTCString(),
    };
    return timeLeft;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeBeforeUpdate(calculateTimeLeft(new Date(props.date)));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeBeforeUpdate]);

  return (
    <div className='top-panel'>
      {props.width >= 850 && (
        <div className='view-controls'>
          <div
            aria-hidden='true'
            className={activeIcon1 ? 'icon activated' : 'icon'}
            title='Card View'
            onClick={() => {
              handleIconClick1();
              props.changeView(true);
            }}
          >
            {' '}
            <Tooltip title='Card View' placement='top' disableInteractive>
              <CropSquareIcon
                sx={{
                  fontSize: 28,
                  color: activeIcon1 ? '#ccc' : '#555',
                }}
              ></CropSquareIcon>
            </Tooltip>
          </div>
          <div
            aria-hidden='true'
            className={activeIcon2 ? 'icon activated' : 'icon'}
            title='List View'
            onClick={() => {
              handleIconClick2();
              props.changeView(false);
            }}
          >
            <Tooltip title='List View' placement='top' disableInteractive>
              <FormatListBulletedIcon
                sx={{
                  fontSize: 28,
                  color: activeIcon2 ? '#ccc' : '#555',
                }}
              ></FormatListBulletedIcon>
            </Tooltip>
          </div>
          <div></div>
        </div>
      )}
      <div aria-hidden='true' className='icon'></div>
    </div>
  );
};

export default TopPanel;
