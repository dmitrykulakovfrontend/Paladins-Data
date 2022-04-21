import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const Timer = ({ time, timeLeft, color }) => {
  if (!timeLeft.title) timeLeft.title = 'Loading...';

  return (
    <div className={`timer-container timer-${color}`}>
      <div className='timer-label'>
        {time !== undefined ? time.title : 'Loading...'}
      </div>
      <Tooltip title={timeLeft.title} placement='right' disableInteractive>
        <div className='timer-countdown'>
          {Object.keys(timeLeft).length > 1
            ? `${timeLeft.days} days,
${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}
`
            : 'Loading...'}
        </div>
      </Tooltip>
    </div>
  );
};

export default Timer;
