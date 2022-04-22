import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const Timer = ({ event, color }) => {
  console.log(event);

  return (
    <div className={`timer-container timer-${color}`}>
      <div className='timer-label'>{event ? event.title : 'Loading...'}</div>
      <Tooltip
        title={event.timeLeft ? event.timeLeft.tooltipTitle : 'Loading...'}
        placement='right'
        disableInteractive
      >
        <div className='timer-countdown'>
          {event.timeLeft
            ? `${event.timeLeft.days} days,
${event.timeLeft.hours}:${event.timeLeft.minutes}:${event.timeLeft.seconds}
`
            : 'Loading...'}
        </div>
      </Tooltip>
    </div>
  );
};

export default Timer;
