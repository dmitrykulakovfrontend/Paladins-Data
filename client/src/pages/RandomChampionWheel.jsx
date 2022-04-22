import React, { useEffect, useState } from 'react';
import { SpinningWheel } from './Wheel/displaycomponent';
import { useQuery } from '@apollo/client';
import { GET_ICONS } from '../query/champions';
import CircularProgress from '@mui/material/CircularProgress';
import { MdRestartAlt } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';

const RandomChampionWheel = ({ width }) => {
  const [ wheel, setWheel ] = useState({});
  const [ filteredWheel, setFilteredWheel ] = useState({});
  const { loading, error, data } = useQuery(GET_ICONS);

  const filterChampions = (Role) => {
    switch (Role) {
      case 'damages':
        setFilteredWheel(
          wheel.filter((champion) => champion.Roles === 'Paladins Damage'),
        );
        break;
      case 'supports':
        setFilteredWheel(
          Object.assign({}, wheel.filter((champion) => champion.Roles === 'Paladins Support')),
        );
        console.log(filteredWheel);
        break;
      case 'tanks':
        setFilteredWheel(
          Object.assign({}, wheel.filter(
            (champion) => champion.Roles === 'Paladins Front Line',
          )),
        );
        break;
      case 'flanks':
        setFilteredWheel(
          wheel.filter((champion) => champion.Roles === 'Paladins Flanker'),
        );
        break;
      default:
        setFilteredWheel(wheel);
        break;
    }
  };

  const displayResult = (spinResult) => {
    return <img src={`${spinResult}`} alt={'result'} />;
  };

  useEffect(() => {
    if (!data) return;
    const wheelOptions = [];
    const icons = data.getChampionsInfo;
    for (let i = 0; i < icons.length; i++) {
      wheelOptions[ i + 1 ] = {
        image: icons[ i ].ChampionIcon_URL,
        result: icons[ i ].ChampionIcon_URL,
        Roles: icons[ i ].Roles
      };
    }
    setWheel(wheelOptions);
    setFilteredWheel(wheelOptions);
  }, [ data ]);

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
        <SpinningWheel
          sources={filteredWheel}
          displayResult={displayResult}
          width={width}
          outerRingColor={'crimson'}
        />
        <div>
          <div className='class-buttons' style={{
            margin: '30px 0 0 0',
          }}>
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

        </div>
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
