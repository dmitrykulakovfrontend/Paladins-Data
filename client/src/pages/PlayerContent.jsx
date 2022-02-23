import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_PLAYER } from '../query/player';
import { combineQueues, makeOverallStats } from '../helpers.js';
import { Helmet } from 'react-helmet-async';

import TopPanel from '../components/TopPanel';
import ProfileStatsContainer from '../components/ProfileStatsContainer';
import MainStatContainer from '../components/MainStatContainer';

import CircularProgress from '@mui/material/CircularProgress';

const PlayerContent = ({ width }) => {
  const [getPlayer, { loading, error, data }] = useLazyQuery(GET_PLAYER);
  const [selectedChampion, setSelectedChampion] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [isCardView, setCardView] = useState(true);
  const didMount = useRef(false);
  let location = useLocation();
  let name = location.pathname.split('/')[2];
  let player = playerData;

  useEffect(() => {
    if (location.state) {
      setPlayerData(location.state);
    }
  }, []);

  useEffect(async () => {
    if (player) return;
    const newData = {};

    const answer = await getPlayer({
      variables: { hz_player_name: name },
    });
    if (answer.error || answer.data.getPlayer === null) {
      answer.error && console.log(answer.error);
      return;
    }
    const playerData = answer.data.getPlayer;
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

    newData.playerData = playerData;
    newData.ranked = ranked;
    newData.overall = overall;
    newData.casual = casual;
    newData.queues = queues;
    setPlayerData(newData);
  }, []);

  useEffect(() => {
    if (width <= 850) {
      setCardView(false);
    }
  });

  const changeView = (bool) => {
    setCardView(bool);
  };

  if (!player)
    return (
      <div
        className='main-content-container-bg'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color='secondary' size={300} />
      </div>
    );
  if (error) return <div>error</div>;

  return (
    <div className='main-content-container-bg'>
      <Helmet>
        <html lang='en' />
        <title>Paladins Data - {player.playerData.hz_player_name}</title>
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
      <TopPanel width={width} changeView={changeView} />

      <ProfileStatsContainer width={width} player={player} />
      <MainStatContainer
        width={width}
        player={player}
        isCardView={isCardView}
      />
    </div>
  );
};

export default PlayerContent;
