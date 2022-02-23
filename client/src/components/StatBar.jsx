import React from 'react';

const StatBar = ({ data, align, dataBar, player }) => {
  const normalise = (value, MIN, MAX) => ((value - MIN) * 100) / (MAX - MIN);
  return align === 'left' ? (
    <div className='card-stat-container'>
      <div className='card-stat-content'>
        <div
          className='card-stat-data'
          style={{ gridTemplateRows: 'repeat(1, 100px)' }}
        >
          <div className='showcase-entry'>
            <p className='showcase-entry-label'>{data.title1} </p>
            <p className='showcase-entry-data'>{data.value1}%</p>
          </div>
        </div>
        <div style={{ height: `80%`, margin: `auto 10px` }}>
          <div
            style={{
              backgroundColor: `rgb(1, 186, 228)`,
              overflow: `hidden`,
              borderRadius: `50px`,
              flexDirection: `column`,
              height: `100%`,
              width: `5px`,
            }}
          >
            <div
              style={{
                backgroundColor: `rgb(129, 0, 26)`,
                flexDirection: `column`,
                height: `100%`,
                width: `5px`,
                transform: `translateY(-${dataBar}%)`,
              }}
            ></div>
          </div>
        </div>
        <div className='card-stat-data'>
          <div className='showcase-entry'>
            <p className='showcase-entry-label'>{data.title2} </p>
            <p className='showcase-entry-data'>{data.value2}</p>
          </div>
          <div className='showcase-entry'>
            <p className='showcase-entry-label'>{data.title3} </p>
            <p className='showcase-entry-data'>{data.value3}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='card-stat-container'>
      <div className='card-stat-content'>
        <div className='card-stat-data'>
          <div className='showcase-entry'>
            <p className='showcase-entry-label'>Time in ranked:</p>
            <p className='showcase-entry-data'>
              {player.ranked.Minutes === 0
                ? 'Never played'
                : `${Math.round(player.ranked.Minutes / 60)}h`}
            </p>
          </div>
          <div className='showcase-entry'>
            <p className='showcase-entry-label'>Time in casual:</p>
            <p className='showcase-entry-data'>
              {Math.round(player.casual.Minutes / 60)}h
            </p>
          </div>
        </div>
        <div style={{ height: `80%`, margin: `auto 10px` }}>
          <div
            style={{
              backgroundColor: `rgb(1, 186, 228)`,
              overflow: `hidden`,
              borderRadius: `50px`,
              flexDirection: `column`,
              height: `100%`,
              width: `5px`,
            }}
          >
            <div
              style={{
                backgroundColor: `rgb(129, 0, 26)`,
                flexDirection: `column`,
                height: `100%`,
                width: `5px`,
                transform: `translateY(-${normalise(
                  player.casual.Minutes,
                  0,
                  player.casual.Minutes + player.ranked.Minutes,
                )}%)`,
              }}
            ></div>
          </div>
        </div>
        <div
          className='card-stat-data'
          style={{ gridTemplateRows: 'repeat(1, 100px)' }}
        >
          <div className='showcase-entry'>
            <p className='showcase-entry-label'>Playstyle: </p>
            <p className='showcase-entry-data'>
              {player.queues.length !== 0
                ? (
                    (player.casual.Minutes /
                      (player.casual.Minutes + player.ranked.Minutes)) *
                    100
                  ).toFixed(2) + '%'
                : 'None'}{' '}
              {player.queues.length !== 0
                ? player.casual.Minutes > player.ranked.Minutes
                  ? 'Casual player'
                  : 'Ranked player'
                : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatBar;
