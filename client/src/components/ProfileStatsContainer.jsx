import { useState, useEffect } from 'react';

import { FaSteam } from 'react-icons/fa';
import { SiEpicgames } from 'react-icons/si';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { rankedTiers } from '../Constants';
import CardStatContent from './CardStatContent';

const ProfileStatsContainer = ({ width, player }) => {
  const [inGame, setInGame] = useState(true);

  useEffect(() => {
    switch (player.playerData.Status) {
      case 1:
        setInGame('Lobby');
        break;
      case 2:
        setInGame('Champion selection');
        break;
      case 3:
        setInGame('In match');
        break;
      case 4:
        setInGame('Online');
        break;
      default:
        setInGame('Offline');
        break;
    }
  }, []);

  const normalise = (value, MIN, MAX) => ((value - MIN) * 100) / (MAX - MIN);
  const normaliseDate = (date) => {
    let realDate = new Date(date).toUTCString().slice(5, 16);
    realDate = realDate.split('');
    realDate[6] = ', ';
    realDate = realDate.join('');
    return realDate;
  };

  let createdDate = normaliseDate(player.playerData.Created_Datetime);
  let lastLoginDate = normaliseDate(player.playerData.Last_Login_Datetime);

  return (
    <div className='stat-container' style={{ height: '120%' }}>
      <div
        className='stat-container-content player-container'
        style={width <= 850 ? { display: 'initial' } : { display: 'flex' }}
      >
        <div className='card-stat-container player-info'>
          <div className='card-stat-content'>
            <div
              className={
                player.playerData.Status > 0 && player.playerData.Status < 4
                  ? 'icon-wrapper in-game'
                  : 'icon-wrapper offline'
              }
            >
              <img
                src={
                  player.playerData.AvatarURL !== null
                    ? player.playerData.AvatarURL
                    : 'https://hirez-api-docs.herokuapp.com/paladins/avatar/27649'
                }
                alt=''
              />
            </div>
            <div className='profile-info'>
              <div
                className={
                  player.playerData.Status > 0 && player.playerData.Status < 4
                    ? 'profile-name in-game'
                    : 'profile-name offline'
                }
              >
                {player.playerData.hz_player_name}{' '}
                <p
                  className='showcase-entry-data'
                  style={{
                    color: '#ccc',
                    fontFamily: 'Roboto,sans-serif',
                    fontSize: '12px',
                    fontWeight: '900',
                    border: '2px solid #ccc',
                    width: 'fit-content',
                    height: 'fit-content',
                    display: 'inline',
                    padding: '0 2px',
                  }}
                >
                  {player.playerData.Level}
                </p>
              </div>
              <div
                style={{ marginTop: '5px' }}
                className={
                  player.playerData.Status > 0 && player.playerData.Status < 4
                    ? 'profile-name in-game'
                    : 'profile-name offline'
                }
              >
                {player.playerData.Title}
              </div>
              <div className='profile-id'>{player.playerData.Id}</div>
              <div className='online-status'>
                <div
                  className={
                    player.playerData.Status > 0 && player.playerData.Status < 4
                      ? 'online-light in-game'
                      : 'online-light offline'
                  }
                ></div>
                <div
                  className={
                    player.playerData.Status > 0 && player.playerData.Status < 4
                      ? 'online-text in-game'
                      : 'online-text offline'
                  }
                >
                  {inGame}
                  <Tooltip
                    title={'Updates once in 30 minutes'}
                    placement='top'
                    disableInteractive
                  >
                    <IconButton color={`info`} edge='start' size='small'>
                      <HelpIcon
                        sx={{
                          fontSize: 15,
                          position: 'absolute',
                          bottom: '5px',
                          left: '4px',
                        }}
                      ></HelpIcon>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className='account-created'>
                Account Created:{' '}
                <span style={{ position: 'relative' }}>
                  {createdDate}{' '}
                  {player.playerData.Platform === 'Steam' ? (
                    <FaSteam
                      style={{
                        color: 'gray',
                        fontSize: '20px',
                        position: 'absolute',
                        right: '-20px',
                        bottom: '5px',
                      }}
                    />
                  ) : player.playerData.Platform === 'Epic Games' ? (
                    <SiEpicgames
                      style={{
                        color: 'gray',
                        fontSize: '20px',
                        position: 'absolute',
                        right: '-20px',
                        bottom: '5px',
                      }}
                    />
                  ) : (
                    ''
                  )}
                </span>
              </div>
              <div className='profile-links'>
                <div className='account-created'>
                  Last login: <span>{lastLoginDate}</span>
                </div>
                <div>
                  <a href='#' rel='noreferrer' target='_blank'></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {width <= 850 && (
          <div className='line-grey' style={{ margin: '1em auto' }}></div>
        )}
        <div className='card-stat-container player-stats'>
          <CardStatContent
            firstTitle={'Platform:'}
            firstValue={player.playerData.Platform}
            secondTitle={'Region:'}
            secondValue={player.playerData.Region}
            width={width}
          />
          <CardStatContent
            firstTitle={'Achievements:'}
            firstValue={`${player.playerData.Total_Achievements} / 58`}
            secondTitle={'Progress:'}
            secondValue={{
              data: Math.round(
                normalise(player.playerData.Total_Achievements, 0, 58),
              ),
            }}
          />
          <CardStatContent
            firstTitle={'Ranked:'}
            firstValue={
              player.playerData.Tier === 0
                ? 'Qualifying'
                : rankedTiers[player.playerData.Tier]
            }
            secondTitle={'Triumph Points:'}
            secondValue={`${player.playerData.Points} / 100`}
            tooltip={{ data: 'Shows current ranked', type: 'warning' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsContainer;
