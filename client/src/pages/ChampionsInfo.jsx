import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAMPIONS } from '../query/champions';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from 'react-helmet-async';
import { BsSearch } from 'react-icons/bs';
import { MdRestartAlt } from 'react-icons/md';
import Accordion from '../components/Accordion';
import { v4 as uuid4 } from 'uuid';

const ChampionsInfo = ({ width }) => {
  const [input, setInput] = useState('');
  const { loading, error, data } = useQuery(GET_CHAMPIONS);
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [sortType, setSortType] = useState('All Champions');

  useEffect(() => {
    if (!data) return;
    setChampions(data.getChampionsInfo);
    setFilteredChampions(data.getChampionsInfo);
  }, [data]);

  const handleInput = (e) => {
    setInput(e.target.value);
    setSortType('All Champions');
    setFilteredChampions(
      champions.filter((champion) => {
        return champion.Name_English.toLowerCase().includes(
          e.target.value.toLowerCase(),
        );
      }),
    );
  };
  const filterChampions = (Role) => {
    setInput('');
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

  if (!data) {
    return (
      <>
        <Helmet>
          <html lang='en' />
          <title>Paladins Data - Champions Information</title>
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
        <div className='champions-container' style={{ position: 'relative' }}>
          <div className='champions-container-label'>{sortType}</div>
          <div className='line-grey-left'></div>
          <div className='champions-list'></div>
          <CircularProgress
            color='info'
            size={100}
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              margin: '0 auto',
            }}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>Paladins Data - Champions Information</title>
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
      <div className='top-panel'>
        <div className='search'>
          <BsSearch style={{ margin: 'auto 10px' }} />
          <span
            className='p-autocomplete p-component p-inputwrapper auto-complete'
            aria-haspopup='listbox'
            aria-expanded='false'
            aria-owns='pr_id_1_list'
            id='pr_id_1'
          >
            <input
              type='text'
              role='searchbox'
              aria-autocomplete='list'
              aria-controls='pr_id_1_list'
              className='p-inputtext p-component p-autocomplete-input'
              autoComplete='off'
              placeholder='Champion name'
              value={input}
              onChange={handleInput}
            />
          </span>
        </div>
        <div className='divider'></div>
        <div className='class-buttons'>
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
      <div className='champions-container'>
        <div className='champions-container-label'>{sortType}</div>
        <div className='line-grey-left'></div>
        <div className='champions-list'>
          {filteredChampions.map((champion) => {
            return <Accordion champion={champion} pk={uuid4()} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ChampionsInfo;
