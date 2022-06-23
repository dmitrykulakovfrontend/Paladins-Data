import React, { useEffect, useState } from 'react';
import { SpinningWheel } from './Wheel/DisplayComponent';
import { useQuery } from '@apollo/client';
import { GET_ICONS } from '../query/champions';
import CircularProgress from '@mui/material/CircularProgress';
import { MdRestartAlt } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';

const RandomChampionWheel = ({ width }) => {
  const [ wheel, setWheel ] = useState({});
  const { loading, error, data } = useQuery(GET_ICONS);

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
      };
    }
    setWheel(wheelOptions);
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
