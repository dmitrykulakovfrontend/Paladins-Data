import React, { useEffect, useState } from 'react';
import { SpinningWheel } from './Wheel/displaycomponent';
import { useQuery } from '@apollo/client';
import { GET_ICONS } from '../query/champions';
import CircularProgress from '@mui/material/CircularProgress';
import { MdRestartAlt } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';

const RandomChampionWheel = ({ width }) => {
  const [wheel, setWheel] = useState({});
  const { loading, error, data } = useQuery(GET_ICONS);
  const displayResult = (spinResult) => {
    return <img src={`${spinResult}`} alt={'result'} />;
  };

  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [sortType, setSortType] = useState('All Champions');

  useEffect(() => {
    if (!data) return;
    console.log('initial', data);
    setChampions(data.getChampionsInfo);
    setFilteredChampions(data.getChampionsInfo);
  }, [data]);

  const filterChampions = (Role) => {
    switch (Role) {
      case 'damages':
        setFilteredChampions(
          champions.filter((champion) => champion.Roles === 'Paladins Damage'),
        );
        setSortType('Damages');
        break;
      case 'supports':
        setFilteredChampions(
          champions.filter((champion) => champion.Roles === 'Paladins Support'),
        );
        setSortType('Supports');
        break;
      case 'tanks':
        setFilteredChampions(
          champions.filter(
            (champion) => champion.Roles === 'Paladins Front Line',
          ),
        );
        setSortType('Front Lines');
        break;
      case 'flanks':
        setFilteredChampions(
          champions.filter((champion) => champion.Roles === 'Paladins Flanker'),
        );
        setSortType('Flanks');
        break;
      default:
        setFilteredChampions(champions);
        setSortType('All Champions');
        break;
    }
  };

  console.log(data);

  useEffect(() => {
    if (!data) return;
    console.log('initial wheel', data);
    const wheelOptions = [];
    const icons = filteredChampions;
    for (let i = 0; i < icons.length; i++) {
      wheelOptions[i + 1] = {
        image: icons[i].ChampionIcon_URL,
        result: icons[i].ChampionIcon_URL,
      };
    }
    console.log({ wheelOptions, icons, filteredChampions });
    setWheel(wheelOptions);
  }, [sortType, data, filteredChampions]);

  if (Object.entries(wheel).length !== 0) {
    return (
      <div
        className='main-content-container-bg'
        style={{
          display: 'flex',
          justifyContent: 'top',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Helmet>
          <html lang='en' />
          <title>Paladins Data - Random Champion</title>
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
        <div className='class-buttons' style={{ marginBottom: '1rem' }}>
          <button
            className='light-button class-button'
            onClick={() => filterChampions('damages')}
          >
            Damage
          </button>
          <button
            className='light-button class-button'
            onClick={() => filterChampions('flanks')}
          >
            Flank
          </button>
          <button
            className='light-button class-button'
            onClick={() => filterChampions('tanks')}
          >
            Front Line
          </button>
          <button
            className='light-button class-button'
            onClick={() => filterChampions('supports')}
          >
            Support
          </button>
          <MdRestartAlt
            onClick={() => filterChampions('default')}
            style={{ color: '#888', fontSize: '25px', textAlign: 'center' }}
          />
        </div>
        <SpinningWheel
          sources={wheel}
          displayResult={displayResult}
          width={width}
          outerRingColor={'crimson'}
        />
      </div>
    );
  } else {
    return (
      <div
        className='main-content-container-bg'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Helmet>
          <html lang='en' />
          <title>Paladins Data - Random Champion</title>
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
        <CircularProgress color='info' size={100} />
      </div>
    );
  }
};

export default RandomChampionWheel;
