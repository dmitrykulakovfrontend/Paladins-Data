/* eslint-disable react/no-unescaped-entities */
/* eslint-disable operator-linebreak */
import { useState, useEffect, useRef } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { useLazyQuery } from '@apollo/client';
import { GET_PLAYER } from '../query/player';
import { combineQueues, makeOverallStats } from '../helpers.js';
import { Helmet } from 'react-helmet-async';
import Tooltip from '@mui/material/Tooltip';
import FAQ from '../components/FAQ';
import CompareView from './CompareView';

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

const Main = ({ comparing }) => {
  const [state, setState] = useState({
    isPlayerNotFound: false,
    input: '',
    tooltipOpen: false,
    isSearchingPlayer: false,
    playerData: {},
    isAnimating: false,
    isComparing: false,
  });
  let navigate = useNavigate();
  const location = useLocation();

  const [getPlayer, { loading, error, data, refetch }] = useLazyQuery(
    GET_PLAYER,
    { errorPolicy: 'all' },
  );

  useEffect(() => {
    if (comparing === true) {
      setState({
        ...state,
        isComparing: true,
      });
    } else if (comparing === false) {
      setState({
        ...state,
        isComparing: false,
      });
    }

    if (location.hash === '#faq') {
      const faq = document
        .querySelector('#faq')
        .scrollIntoView({ behavior: 'smooth' });
    }

    if (location.hash === '#playersearch') {
      const playersearch = document
        .querySelector('#playersearch')
        .scrollIntoView({ behavior: 'smooth' });
    }

    if (location.pathname === '/compare') {
      const playersearch = document
        .querySelector('#playersearch')
        .scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const switchComparing = () => {
    setState({
      ...state,
      isPlayerNotFound: false,
      isSearchingPlayer: false,
      isComparing: !state.isComparing,
    });
  };

  const searchPlayer = async () => {
    const player = await getPlayer({
      variables: { hz_player_name: state.input.trim() },
    });
    if (player.error || player.data.getPlayer === null) {
      setState({
        ...state,
        isPlayerNotFound: true,
        isSearchingPlayer: false,
      });
      player.error && console.log(player.error);
      return;
    }
    const playerData = player.data.getPlayer;
    const queues = combineQueues(
      playerData.Competitive,
      playerData.Siege,
      playerData.TDM,
      playerData.Onslaught,
    );

    const casual = makeOverallStats(
      combineQueues(playerData.Siege, playerData.TDM, playerData.Onslaught),
    );

    const ranked = makeOverallStats(combineQueues(playerData.Competitive));

    const overall = makeOverallStats(queues);

    setState({
      ...state,
      isSearchingPlayer: false,
    });
    navigate(`../players/${playerData.hz_player_name}`, {
      state: {
        playerData,
        queues,
        overall,
        ranked,
        casual,
      },
      replace: true,
    });
  };

  const handleClick = (e) => {
    if (state.input.trim().length <= 2) {
      setState({
        ...state,
        tooltipOpen: true,
      });
      return;
    }
    setState({
      ...state,
      isPlayerNotFound: false,
      isSearchingPlayer: true,
    });
    searchPlayer();
  };

  const handleKeyPress = (e) => {
    if (e.code !== 'Enter') return false;

    if (state.input.trim().length <= 2) {
      e.preventDefault();
      setState({
        ...state,
        tooltipOpen: true,
      });
      return;
    }
    setState({
      ...state,
      isPlayerNotFound: false,
      isSearchingPlayer: true,
    });
    searchPlayer();
  };

  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>Paladins Data - Search Players</title>
        <meta
          name='keywords'
          content='Paladins,PaladinsData, Paladins Score, Paladins Stats, Paladins Ranking, Paladins MMR, Paladins Profiles, Paladins Random Wheel, Random Champion, Player Comparing, Paladins Compare'
        />
        <meta name='application-name' content='PaladinsData' />
        <meta
          name='description'
          content='PaladinsData - One of the best sources for player profiles, rankings and player comparing'
        />
      </Helmet>
      <div className='player-search-container' id='playersearch'>
        <div className='player-search-background'>
          <div className='animation-container'>
            {state.isPlayerNotFound && (
              <>
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
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className='line-crimson'></div>
              </>
            )}
            {state.isComparing ? (
              <CompareView switchComparing={switchComparing} />
            ) : (
              <>
                <div className='search-container'>
                  <div
                    onKeyDown={
                      state.isSearchingPlayer ? undefined : handleKeyPress
                    }
                    className={
                      state.isPlayerNotFound
                        ? 'search-bar standalone error'
                        : 'search-bar standalone'
                    }
                  >
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
                      placement='left'
                    >
                      <input
                        type='text'
                        name='playerinfo'
                        placeholder='Enter Username or Match ID'
                        value={state.input}
                        onChange={(e) =>
                          setState({
                            ...state,
                            input: e.target.value,
                          })
                        }
                      />
                    </Tooltip>
                    <button
                      aria-label='Search'
                      type='button'
                      onClick={
                        state.isSearchingPlayer ? undefined : handleClick
                      }
                    >
                      {state.isSearchingPlayer ? (
                        <CircularProgress color={`info`} size={25} />
                      ) : (
                        <HiChevronDoubleRight style={{ fontSize: '30px' }} />
                      )}
                    </button>
                  </div>
                </div>
                <div className='separator-word'>
                  <div className='line-crimson-right'></div>
                  <span></span>
                  <div className='line-crimson-left'></div>
                </div>
                <button className='light-button' onClick={switchComparing}>
                  compare with others
                </button>
              </>
            )}
            <div className='info-container'>
              <span>
                <BsInfoCircleFill style={{ fontSize: '15px' }} /> The profile
                must be{' '}
                <Link className='link' to='#faq'>
                  public
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
    </>
  );
};

export default Main;
