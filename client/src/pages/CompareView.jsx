import { useState, useEffect, useRef, Fragment } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_PLAYER } from '../query/player';
import { GET_CHAMPIONS_ROLES } from '../query/champions';
import { combineQueues, makeOverallStats } from '../helpers';
import Tooltip from '@mui/material/Tooltip';

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
const CompareView = ({ switchComparing }) => {
  const [ state, setState ] = useState({
    firstPlayerInput: '',
    secondPlayerInput: '',
    playersNotFound: false,
    tooltipOpen: false,
    isPlayer1Loading: false,
    isPlayer2Loading: false,
  });


  const [ getPlayer, { loading: playerLoading, error: playerError, data: playerData } ] = useLazyQuery(
    GET_PLAYER,
  );
  const [ getRoles, { loading: RolesLoading, error: RolesError, data: RolesData } ] = useLazyQuery(GET_CHAMPIONS_ROLES);
  let navigate = useNavigate();

  const comparePlayers = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      playersNotFound: false,
    });
    if (
      state.firstPlayerInput.trim().length <= 2 ||
      state.secondPlayerInput.trim().length <= 2
    ) {
      setState({
        ...state,
        tooltipOpen: true,
      });
      return;
    }

    const answer = await Promise.all([
      getRoles(),
      getPlayer({
        variables: {
          hz_player_name: state.firstPlayerInput,
        },
      }),
      getPlayer({
        variables: {
          hz_player_name: state.secondPlayerInput,
        },
      })
    ]);

    console.log(answer);

    const rolesList = answer[ 0 ].data.getChampionsInfo;
    const player1 = answer[ 1 ];
    const player2 = answer[ 2 ];
    if (
      player1.error ||
      player1.data.getPlayer === null ||
      player2.error ||
      player2.data.getPlayer === null
    ) {
      setState({
        ...state,
        playersNotFound: true,
      });
      player1.error && console.log(player1.error);
      player2.error && console.log(player2.error);
      return;
    }

    const players = [];
    players.push(player1.data.getPlayer);
    players.push(player2.data.getPlayer);

    players.forEach((player) => {
      const queues = combineQueues(rolesList,
        player.Competitive,
        player.Siege,
        player.TDM,
        player.Onslaught,
      );

      const casual = makeOverallStats(
        combineQueues(rolesList, player.Siege, player.TDM, player.Onslaught),
      );

      const ranked = makeOverallStats(combineQueues(rolesList, player.Competitive));

      const overall = makeOverallStats(queues);

      player.queues = queues;
      player.casual = casual;
      player.ranked = ranked;
      player.overall = overall;
    });

    navigate(
      `../players/compare/${players[ 0 ].ActivePlayerId}:${players[ 1 ].ActivePlayerId}`,
      {
        state: { players },
        replace: true,
      },
    );
  };

  return (
    <Fragment>
      {state.playersNotFound && (
        <Fragment>
          <div className='error-text'>
            Profile hidden or not found.
            <Tooltip
              title='If you are sure what player exist and his profile is not hidden, then it is problem from our side, please message me about that.'
              placement='top'
              disableInteractive
            >
              <IconButton color='info' edge='start' size='small'>
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
          <div className='line-crimson'></div>
        </Fragment>
      )}
      <div className='compare-form-container'>
        <form className='search-container' id='compare-form'>
          <div className='search-bar false' title=''>
            <div className='field-identifier'>
              <p>1</p>
            </div>{' '}
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    color: '#ccc',
                    backgroundColor: '#363636',
                    fontSize: '12px',
                    padding: '0.5em',
                  },
                },
              }}
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setState({ ...state, tooltipOpen: false })}
              open={state.tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title='Invalid input.'
              placement='top'
            >
              <input
                type='text'
                name='steaminfo'
                placeholder='Enter username'
                value={state.firstPlayerInput}
                onChange={(e) =>
                  setState({ ...state, firstPlayerInput: e.target.value })
                }
              />
            </Tooltip>
          </div>
          <div className='search-bar false' title=''>
            <div className='field-identifier'>
              <p>2</p>
            </div>
            <input
              type='text'
              name='steaminfo'
              placeholder='Enter username'
              value={state.secondPlayerInput}
              onChange={(e) =>
                setState({ ...state, secondPlayerInput: e.target.value })
              }
            />
          </div>
        </form>
        <div
          className='line-crimson'
          style={{
            margin: '1.5em 0px',
            width: '100%',
            maxWidth: '400px',
          }}
        ></div>
        <div className='buttons'>
          <button className='light-button' onClick={() => switchComparing()}>
            <span style={{ marginLeft: `0.5em` }}>Back</span>
          </button>
          {playerLoading || RolesLoading ? <CircularProgress color='info' size={25} /> : ''}
          <button
            className='light-button'
            type='submit'
            form='compare-form'
            onClick={comparePlayers}
          >
            <span style={{ marginRight: `0.5em` }}>Compare</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CompareView;
