import { rankedTiers } from '../constants';

import { useState, useEffect } from 'react';
import MuiTable from '../components/MuiTable';
import StatBar from './StatBar';
import CardStatContent from './CardStatContent';
import {
  countBestKDA,
  countBestWinrate,
  countMostPlayedType,
} from '../helpers';
import ChampionsTable from './ChampionsTable';

const MainStatContainer = ({ width, player, isCardView }) => {
  const [champions, setChampions] = useState(player.queues);

  const numberWithSpaces = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const normalise = (value, MIN, MAX) => ((value - MIN) * 100) / (MAX - MIN);

  const champWithBestWinrate =
    player.queues.length !== 0 ? countBestWinrate(player.queues) : 'None';
  const champWithBestKDA =
    player.queues.length !== 0 ? countBestKDA(player.queues) : 'None';
  const typeStats =
    player.queues.length !== 0 ? countMostPlayedType(player.queues) : 'None';
  const winrate =
    player.queues.length !== 0
      ? (
          (player.playerData.Wins /
            (player.playerData.Wins + player.playerData.Losses)) *
          100
        ).toFixed(2)
      : 0;

  const winrateBar = normalise(
    player.playerData.Wins,
    0,
    player.playerData.Wins + player.playerData.Losses,
  );

  return (
    <div className='stat-container' menu-item='nav-general'>
      <div className='stat-container-label'>General</div>
      <div className='line-grey-left'></div>
      <div className='stat-container-content'>
        {isCardView ? (
          <>
            <div className='stat-container-content-label'>Progression</div>
            <div className='stat-container-content-row'>
              <StatBar
                align={'left'}
                data={{
                  title1: 'Winrate:',
                  value1: winrate,
                  title2: 'Losses:',
                  value2: player.playerData.Losses,
                  title3: 'Wins:',
                  value3: player.playerData.Wins,
                }}
                dataBar={winrateBar}
              />
              <div className='card-stat-container'>
                <CardStatContent
                  firstTitle={'Overall Credits:'}
                  firstValue={numberWithSpaces(player.overall.Gold)}
                  secondTitle={'Total exp:'}
                  secondValue={numberWithSpaces(player.playerData.Total_XP)}
                  margin={{ marginTop: 0 }}
                />
                <CardStatContent
                  firstTitle={'Total playtime'}
                  firstValue={`${player.playerData.HoursPlayed}h (${Math.round(
                    player.overall.Minutes / 60,
                  )}h)`}
                  tooltip={{
                    data: 'In game (In match)',
                    type: 'info',
                  }}
                  secondTitle={'Amount of games:'}
                  secondValue={
                    player.playerData.Wins + player.playerData.Losses
                  }
                  margin={{ marginTop: 0 }}
                />
                <div className='card-stat-content'></div>
              </div>
              <StatBar align={'right'} player={player} />
            </div>
            <div className='stat-container-content-label'>Funny Facts</div>
            <div className='stat-container-content-row'>
              <div className='card-stat-container'>
                <CardStatContent
                  firstTitle={'Favorite champion:'}
                  firstValue={
                    player.queues.length !== 0
                      ? player.queues.sort(
                          (champ1, champ2) => champ2.Minutes - champ1.Minutes,
                        )[0].Champion +
                        ' (' +
                        Math.round(
                          player.queues.sort(
                            (champ1, champ2) => champ2.Minutes - champ1.Minutes,
                          )[0].Minutes / 60,
                        ) +
                        'h)'
                      : 'None'
                  }
                  secondTitle={'Less playtime champion:'}
                  secondValue={
                    player.queues.length !== 0
                      ? player.queues.sort(
                          (champ1, champ2) => champ1.Minutes - champ2.Minutes,
                        )[0].Champion +
                        ' (' +
                        (
                          player.queues.sort(
                            (champ1, champ2) => champ1.Minutes - champ2.Minutes,
                          )[0].Minutes / 60
                        ).toFixed(2) +
                        'h)'
                      : 'None'
                  }
                  margin={{ marginTop: 0 }}
                />
                <CardStatContent
                  firstTitle={' Highest deaths champion:'}
                  firstValue={
                    player.queues.length !== 0
                      ? player.queues.sort(
                          (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                        )[0].Champion +
                        ' (' +
                        player.queues.sort(
                          (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                        )[0].Deaths +
                        ')'
                      : 'None'
                  }
                  secondTitle={'Highest kills champion:'}
                  secondValue={
                    player.queues.length !== 0
                      ? player.queues.sort(
                          (champ1, champ2) => champ2.Kills - champ1.Kills,
                        )[0].Champion +
                        ' (' +
                        player.queues.sort(
                          (champ1, champ2) => champ2.Kills - champ1.Kills,
                        )[0].Kills +
                        ')'
                      : 'None'
                  }
                  margin={{ marginTop: 0 }}
                />
              </div>
              <div className='card-stat-container'>
                <CardStatContent
                  firstTitle={'Champion with best KDA:'}
                  firstValue={
                    champWithBestKDA == 'None'
                      ? 'None'
                      : champWithBestKDA.Champion +
                        ' (' +
                        (
                          (champWithBestKDA.Deaths +
                            0.5 * champWithBestKDA.Assists) /
                          champWithBestKDA.Deaths
                        ).toFixed(2) +
                        ')'
                  }
                  tooltip={{
                    data: 'Counts only 60+ minutes played, if no champions with 60+ minutes then count all',
                    type: 'info',
                  }}
                  secondTitle={'Best winrate:'}
                  secondValue={
                    champWithBestWinrate == 'None'
                      ? 'None'
                      : champWithBestWinrate.Champion +
                        ' (' +
                        (
                          (champWithBestWinrate.Wins /
                            (champWithBestWinrate.Wins +
                              champWithBestWinrate.Losses)) *
                          100
                        ).toFixed(2) +
                        '%)'
                  }
                  tooltip2={{
                    data: 'Counts only 60+ minutes played, if no champions with 60+ minutes then count all',
                    type: 'info',
                  }}
                  margin={{ marginTop: 0 }}
                />
                <CardStatContent
                  firstTitle={'Most played class:'}
                  firstValue={
                    typeStats == 'None'
                      ? 'None'
                      : typeStats.bestType +
                        ' (' +
                        Math.round(typeStats.bestTypeValue / 60) +
                        'h)'
                  }
                  secondTitle={'Less played class:'}
                  secondValue={
                    typeStats == 'None'
                      ? 'None'
                      : typeStats.worstType +
                        ' (' +
                        (Math.round(typeStats.worstTypeValue / 60) + 'h)')
                  }
                  margin={{ marginTop: 0 }}
                />
              </div>
              <ChampionsTable queue={champions} width={width} />
            </div>{' '}
          </>
        ) : (
          <>
            <div className='table-wrapper'>
              <div className='table-wrapper-header'>
                <div className='table-wrapper-header-label'>Progression</div>
                <div className='profile-label'>
                  <div className='empty'></div>
                </div>
              </div>
              <div>
                <MuiTable
                  rows={[
                    {
                      title: 'Wins',
                      value: numberWithSpaces(player.playerData.Wins),
                    },
                    {
                      title: 'Losses',
                      value: numberWithSpaces(player.playerData.Losses),
                    },
                    {
                      title: 'Winrate',
                      value:
                        player.queues.length !== 0
                          ? (
                              (player.playerData.Wins /
                                (player.playerData.Wins +
                                  player.playerData.Losses)) *
                              100
                            ).toFixed(2) + '%'
                          : 0 + '%',
                    },
                  ]}
                  columns={[
                    { id: 'title', label: 'Games', minWidth: 170 },
                    {
                      id: 'value',
                      label: '',
                      minWidth: 80,
                      align: 'right',
                    },
                  ]}
                />
                <MuiTable
                  rows={[
                    {
                      title: 'Credits',
                      value: numberWithSpaces(player.overall.Gold),
                    },
                    {
                      title: 'Total XP',
                      value: numberWithSpaces(player.playerData.Total_XP),
                    },
                    {
                      title: 'Max rank',
                      value:
                        player.playerData.Tier === 0
                          ? 'Qualifying'
                          : rankedTiers[player.playerData.Tier],
                    },
                    {
                      title: 'Lowest rank',
                      value:
                        player.playerData.Tier === 0
                          ? 'Qualifying'
                          : rankedTiers[player.playerData.Tier],
                    },
                  ]}
                  columns={[
                    { id: 'title', label: 'Numbers', minWidth: 170 },
                    {
                      id: 'value',
                      label: '',
                      minWidth: 80,
                      align: 'right',
                    },
                  ]}
                />
                <MuiTable
                  rows={[
                    {
                      title: 'Playtime in ranked',
                      value:
                        player.ranked.Minutes === 0
                          ? 'Never played'
                          : `${Math.round(player.ranked.Minutes / 60)}h`,
                    },
                    {
                      title: 'Playtime in casual',
                      value: Math.round(player.casual.Minutes / 60) + 'h',
                    },
                    {
                      title: 'Playstyle',
                      value: `${
                        player.queues.length !== 0
                          ? (
                              (player.casual.Minutes /
                                (player.casual.Minutes +
                                  player.ranked.Minutes)) *
                              100
                            ).toFixed(2) + '%'
                          : 'None'
                      } 
                      ${
                        player.queues.length !== 0
                          ? player.casual.Minutes > player.ranked.Minutes
                            ? 'Casual player'
                            : 'Ranked player'
                          : ''
                      }`,
                    },
                  ]}
                  columns={[
                    { id: 'title', label: 'Ranked', minWidth: 170 },
                    {
                      id: 'value',
                      label: '',
                      minWidth: 80,
                      align: 'right',
                    },
                  ]}
                />
              </div>
              <div className='table-wrapper'></div>
            </div>
            <div className='table-wrapper'>
              <div className='table-wrapper-header'>
                <div className='table-wrapper-header-label'>Champion Facts</div>
                <div className='profile-label'>
                  <div className='empty'></div>
                </div>
              </div>
              <div>
                <MuiTable
                  rows={[
                    {
                      title: 'Favorite champion',
                      value:
                        player.queues.length !== 0
                          ? player.queues.sort(
                              (champ1, champ2) =>
                                champ2.Minutes - champ1.Minutes,
                            )[0].Champion +
                            ' ' +
                            Math.round(
                              player.queues.sort(
                                (champ1, champ2) =>
                                  champ2.Minutes - champ1.Minutes,
                              )[0].Minutes / 60,
                            ) +
                            'h'
                          : 'None',
                    },
                    {
                      title: 'Less playtime champion',
                      value:
                        player.queues.length !== 0
                          ? player.queues.sort(
                              (champ1, champ2) =>
                                champ1.Minutes - champ2.Minutes,
                            )[0].Champion +
                            ' ' +
                            (
                              player.queues.sort(
                                (champ1, champ2) =>
                                  champ1.Minutes - champ2.Minutes,
                              )[0].Minutes / 60
                            ).toFixed(2) +
                            'h'
                          : 'None',
                    },
                    {
                      title: 'Highest kills champion',
                      value:
                        player.queues.length !== 0
                          ? player.queues.sort(
                              (champ1, champ2) => champ2.Kills - champ1.Kills,
                            )[0].Champion +
                            ' ' +
                            player.queues.sort(
                              (champ1, champ2) => champ2.Kills - champ1.Kills,
                            )[0].Kills
                          : 'None',
                    },
                    {
                      title: 'Highest deaths champion',
                      value:
                        player.queues.length !== 0
                          ? player.queues.sort(
                              (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                            )[0].Champion +
                            ' ' +
                            player.queues.sort(
                              (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                            )[0].Deaths
                          : 'None',
                    },
                  ]}
                  columns={[
                    { id: 'title', label: 'Champions', minWidth: 170 },
                    {
                      id: 'value',
                      label: '',
                      minWidth: 80,
                      align: 'right',
                    },
                  ]}
                />
                <MuiTable
                  rows={[
                    {
                      title: 'Champion with best KDA',
                      value:
                        champWithBestKDA == 'None'
                          ? 'None'
                          : champWithBestKDA.Champion +
                            ' ' +
                            (
                              (champWithBestKDA.Deaths +
                                0.5 * champWithBestKDA.Assists) /
                              champWithBestKDA.Deaths
                            ).toFixed(2),
                    },
                    {
                      title: 'Best winrate',
                      value:
                        champWithBestWinrate == 'None'
                          ? 'None'
                          : champWithBestWinrate.Champion +
                            ' ' +
                            (
                              (champWithBestWinrate.Wins /
                                (champWithBestWinrate.Wins +
                                  champWithBestWinrate.Losses)) *
                              100
                            ).toFixed(2) +
                            '%',
                    },
                    {
                      title: 'Most played class',
                      value:
                        typeStats == 'None'
                          ? 'None'
                          : typeStats.bestType +
                            ' ' +
                            Math.round(typeStats.bestTypeValue / 60) +
                            'h',
                    },
                    {
                      title: 'Less played class',
                      value:
                        typeStats == 'None'
                          ? 'None'
                          : typeStats.worstType +
                            ' ' +
                            (Math.round(typeStats.worstTypeValue / 60) + 'h'),
                    },
                  ]}
                  columns={[
                    { id: 'title', label: '', minWidth: 170 },
                    {
                      id: 'value',
                      label: '',
                      minWidth: 80,
                      align: 'right',
                    },
                  ]}
                />
              </div>
            </div>
            <ChampionsTable queue={champions} width={width} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainStatContainer;
