/* eslint-disable react/no-unescaped-entities */
/* eslint-disable operator-linebreak */
import { useState, useEffect, useRef, Fragment } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { useLazyQuery } from '@apollo/client';
import { GET_PLAYER } from '../query/player';
import { GET_CHAMPIONS_ROLES } from '../query/champions';
import { combineQueues, makeOverallStats } from '../helpers.js';
import { Helmet } from 'react-helmet-async';
import Tooltip from '@mui/material/Tooltip';
import FAQ from '../components/FAQ';
import CompareView from './CompareView';
import SearchPlayerView from './SearchPlayerView';

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';

const Main = ({ comparing }) => {
  const [ state, setState ] = useState({
    isPlayerNotFound: false,
    isTooltipOpen: false,
    isSearchingPlayer: false,
    isAnimating: false,
  });

  const [ showComparing, setShowComparing ] = useState(false);
  const [ player, setPlayer ] = useState({});
  const [ input, setInput ] = useState('');
  let navigate = useNavigate();
  const location = useLocation();


  const [ getPlayer, { loading: playerLoading, error: playerError, data: playerData } ] = useLazyQuery(
    GET_PLAYER,
  );
  const [ getRoles, { loading: RolesLoading, error: RolesError, data: RolesData } ] = useLazyQuery(GET_CHAMPIONS_ROLES);

  const scrollInto = (target) => {
    if (!target) return;
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    comparing ? setShowComparing(true) : setShowComparing(false);

    location.pathname === '/compare'
      ? scrollInto('#playersearch')
      : scrollInto(location.hash);
  }, [ location ]);

  const switchComparing = () => {
    setState({
      ...state,
      isPlayerNotFound: false,
      isSearchingPlayer: false,
    });
    setShowComparing(!showComparing);
  };

  const searchPlayer = async (name) => {

    setState({
      ...state,
      isPlayerNotFound: false,
      isSearchingPlayer: true,
    });

    const data = await Promise.all([ getPlayer({
      variables: { hz_player_name: name ? name : input },
    }), getRoles() ])

    const playerData = data[ 0 ].data.getPlayer;
    const rolesList = data[ 1 ].data.getChampionsInfo;


    if (player.error || player === null) {
      setState({
        ...state,
        isPlayerNotFound: true,
        isSearchingPlayer: false,
      });
      player.error && console.log(player.error);
      return;
    }

    const queues = combineQueues(rolesList,
      playerData.Competitive,
      playerData.Siege,
      playerData.TDM,
      playerData.Onslaught,
    );

    const casual = makeOverallStats(
      combineQueues(rolesList, playerData.Siege, playerData.TDM, playerData.Onslaught),
    );

    const ranked = makeOverallStats(combineQueues(rolesList, playerData.Competitive));

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

  const handleClick = () => {
    if (input.length <= 2) {
      setState({
        ...state,
        isTooltipOpen: true,
      })

      setTimeout(() => {
        setState({
          ...state,
          isTooltipOpen: false,
        });
      }, 750)
      return;
    }

    searchPlayer();
  };

  const handleChange = (e) => {
    setInput(e.target.value.trim());
  };

  const handleKeyPress = (e) => {
    if (e.code !== 'Enter') return false;

    handleClick();
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
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className='line-crimson'></div>
              </Fragment>
            )}
            {showComparing ? (
              <CompareView switchComparing={switchComparing} />
            ) : (
              <SearchPlayerView
                handleKeyPress={handleKeyPress}
                handleClick={handleClick}
                handleChange={handleChange}
                switchComparing={switchComparing}
                input={input}
                searchPlayer={searchPlayer}
                isSearchingPlayer={state.isSearchingPlayer}
                isPlayerNotFound={state.isPlayerNotFound}
                isTooltipOpen={state.isTooltipOpen}
              />
            )}
            <div className='info-container'>
              <span>
                <BsInfoCircleFill style={{ fontSize: '15px' }} /> The profile
                must be
                <Link className='link' to='#faq'>
                  {' '}
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
