import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const Timer = ({ event, color }) => {
  return (
    <div className={`timer-container timer-${color}`}>
      <h4 className='timer-label'>{event ? event.title : 'Loading...'}</h4>
      <Tooltip
        title={event.timeLeft ? event.timeLeft.tooltipTitle : 'Loading...'}
        placement='right'
        disableInteractive
      >
        <span className='timer-countdown'>
          {event.timeLeft
            ? `${event.timeLeft.days} days,
${event.timeLeft.hours}:${event.timeLeft.minutes}:${event.timeLeft.seconds}
`
            : 'Loading...'}
        </span>
      </Tooltip>
    </div>
  );
};

export default Timer;
