import React from 'react';
import { useLocation } from 'react-router-dom';

import MuiTable from '../components/MuiTable';
import { rankedTiers } from '../constants';
import {
  countBestKDA,
  countBestWinrate,
  countMostPlayedType,
} from '../helpers';
import {Helmet} from 'react-helmet-async';

const PlayersComparing = ({ width }) => {
  let location = useLocation();
  let players = location.state.players;
  const player = players[0];
  const player2 = players[1];
  const numberWithSpaces = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const normalise = (value, MIN, MAX) => ((value - MIN) * 100) / (MAX - MIN);
  const champWithBestWinrate =
    player.queues.length !== 0 ? countBestWinrate(player.queues) : 'None';
  const champWithBestWinrate2 =
    player2.queues.length !== 0 ? countBestWinrate(player2.queues) : 'None';
  const champWithBestKDA =
    player.queues.length !== 0 ? countBestKDA(player.queues) : 'None';
  const champWithBestKDA2 =
    player2.queues.length !== 0 ? countBestKDA(player2.queues) : 'None';
  const typeStats =
    player.queues.length !== 0 ? countMostPlayedType(player.queues) : 'None';
  const typeStats2 =
    player2.queues.length !== 0 ? countMostPlayedType(player2.queues) : 'None';
  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>
          Paladins Data - {player.hz_player_name} and {player2.hz_player_name}
        </title>
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
      <div className='stat-container'>
        <div className='stat-container-label'>Compare</div>
        <div className='line-grey'></div>
        <div className='stat-container-content'>
          <div className='table-wrapper'>
            <div className='table-wrapper-header'>
              <div className='table-wrapper-header-label'>Profiles</div>
              <div className='profile-label'>
                <div className='empty'></div>
              </div>
            </div>
            <div>
              <MuiTable
                rows={[
                  {
                    title: '',
                    player1Value: (
                      <img
                        src={
                          player.AvatarURL !== null
                            ? player.AvatarURL
                            : 'https://hirez-api-docs.herokuapp.com/paladins/avatar/27649'
                        }
                        alt=''
                        width='50'
                        height='50'
                      />
                    ),
                    player2Value: (
                      <img
                        src={
                          player2.AvatarURL !== null
                            ? player2.AvatarURL
                            : 'https://hirez-api-docs.herokuapp.com/paladins/avatar/27649'
                        }
                        alt=''
                        width='50'
                        height='50'
                      />
                    ),
                  },
                ]}
                columns={[
                  { id: 'title', label: '', minWidth: 65 },
                  {
                    id: 'player1Value',
                    label: ``,
                    minWidth: width <= 700 ? 65 : 70,
                    align: 'right',
                  },
                  {
                    id: 'player2Value',
                    label: ``,
                    minWidth: width <= 700 ? 65 : 70,
                    align: 'right',
                  },
                ]}
              />
              <MuiTable
                rows={[
                  {
                    title: 'Title',
                    player1Value: player.Title,
                    player2Value: player2.Title,
                  },
                  {
                    title: 'Account Created',
                    player1Value: player.Created_Datetime,
                    player2Value: player2.Created_Datetime,
                  },
                  {
                    title: 'Last Login',
                    player1Value: player.Last_Login_Datetime,
                    player2Value: player2.Last_Login_Datetime,
                  },
                  {
                    title: 'Playtime (in match)',
                    player1Value: `${numberWithSpaces(
                      player.HoursPlayed,
                    )}h (${numberWithSpaces(
                      Math.round(player.overall.Minutes / 60),
                    )}h)`,
                    player2Value: `${numberWithSpaces(
                      player2.HoursPlayed,
                    )}h (${numberWithSpaces(
                      Math.round(player2.overall.Minutes / 60),
                    )}h)`,
                  },
                  {
                    title: 'Ranked',
                    player1Value: rankedTiers[player.Tier],
                    player2Value: rankedTiers[player2.Tier],
                  },
                  {
                    title: 'Achievements',
                    player1Value: `${player.Total_Achievements} / 58`,
                    player2Value: `${player2.Total_Achievements} / 58`,
                  },
                  {
                    title: 'Triumph Points',
                    player1Value: player.Points,
                    player2Value: player2.Points,
                  },
                ]}
                columns={[
                  { id: 'title', label: '', minWidth: 60 },
                  {
                    id: 'player1Value',
                    label: `${player.hz_player_name}`,
                    minWidth: width <= 700 ? 65 : 130,
                    align: 'right',
                  },
                  {
                    id: 'player2Value',
                    label: `${player2.hz_player_name}`,
                    minWidth: width <= 700 ? 65 : 130,
                    align: 'right',
                  },
                ]}
              />
              <MuiTable
                rows={[
                  {
                    title: 'Wins',
                    player1Value: numberWithSpaces(player.Wins),
                    player2Value: numberWithSpaces(player2.Wins),
                  },
                  {
                    title: 'Losses',
                    player1Value: numberWithSpaces(player.Losses),
                    player2Value: numberWithSpaces(player2.Losses),
                  },
                  {
                    title: 'Winrate',
                    player1Value:
                      player.queues.length !== 0
                        ? (
                            (player.Wins / (player.Wins + player.Losses)) *
                            100
                          ).toFixed(2) + '%'
                        : 0 + '%',
                    player2Value:
                      player2.queues.length !== 0
                        ? (
                            (player2.Wins / (player2.Wins + player2.Losses)) *
                            100
                          ).toFixed(2) + '%'
                        : 0 + '%',
                  },
                  {
                    title: 'Credits',
                    player1Value: numberWithSpaces(player.overall.Gold),
                    player2Value: numberWithSpaces(player2.overall.Gold),
                  },
                  {
                    title: 'Total XP',
                    player1Value: numberWithSpaces(player.Total_XP),
                    player2Value: numberWithSpaces(player2.Total_XP),
                  },
                  {
                    title: 'Time in casual',
                    player1Value:
                      numberWithSpaces(Math.round(player.casual.Minutes / 60)) +
                      'h',
                    player2Value: numberWithSpaces(
                      Math.round(player2.casual.Minutes / 60) + 'h',
                    ),
                  },
                  {
                    title: 'Time in ranked',
                    player1Value: numberWithSpaces(
                      player.ranked.Minutes === 0
                        ? 'Never played'
                        : `${Math.round(player.ranked.Minutes / 60)}h`,
                    ),
                    player2Value: numberWithSpaces(
                      player2.ranked.Minutes === 0
                        ? 'Never played'
                        : `${Math.round(player2.ranked.Minutes / 60)}h`,
                    ),
                  },
                  {
                    title: 'Playstyle',
                    player1Value: `${
                      player.queues.length !== 0
                        ? (
                            (player.casual.Minutes /
                              (player.casual.Minutes + player.ranked.Minutes)) *
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
                    player2Value: `${
                      player2.queues.length !== 0
                        ? (
                            (player2.casual.Minutes /
                              (player2.casual.Minutes +
                                player2.ranked.Minutes)) *
                            100
                          ).toFixed(2) + '%'
                        : 'None'
                    } 
                    ${
                      player2.queues.length !== 0
                        ? player2.casual.Minutes > player2.ranked.Minutes
                          ? 'Casual player'
                          : 'Ranked player'
                        : ''
                    }`,
                  },
                ]}
                columns={[
                  { id: 'title', label: 'Games', minWidth: 120 },
                  {
                    id: 'player1Value',
                    label: ``,
                    minWidth: width <= 700 ? 65 : 130,
                    align: 'right',
                  },
                  {
                    id: 'player2Value',
                    label: ``,
                    minWidth: width <= 700 ? 65 : 130,
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
                    player1Value:
                      player.queues.length !== 0
                        ? player.queues.sort(
                            (champ1, champ2) => champ2.Minutes - champ1.Minutes,
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
                    player2Value:
                      player2.queues.length !== 0
                        ? player2.queues.sort(
                            (champ1, champ2) => champ2.Minutes - champ1.Minutes,
                          )[0].Champion +
                          ' ' +
                          Math.round(
                            player2.queues.sort(
                              (champ1, champ2) =>
                                champ2.Minutes - champ1.Minutes,
                            )[0].Minutes / 60,
                          ) +
                          'h'
                        : 'None',
                  },
                  {
                    title: 'Less playtime champion',
                    player1Value:
                      player.queues.length !== 0
                        ? player.queues.sort(
                            (champ1, champ2) => champ1.Minutes - champ2.Minutes,
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
                    player2Value:
                      player2.queues.length !== 0
                        ? player2.queues.sort(
                            (champ1, champ2) => champ1.Minutes - champ2.Minutes,
                          )[0].Champion +
                          ' ' +
                          (
                            player2.queues.sort(
                              (champ1, champ2) =>
                                champ1.Minutes - champ2.Minutes,
                            )[0].Minutes / 60
                          ).toFixed(2) +
                          'h'
                        : 'None',
                  },
                  {
                    title: 'Highest kills champion',
                    player1Value:
                      player.queues.length !== 0
                        ? player.queues.sort(
                            (champ1, champ2) => champ2.Kills - champ1.Kills,
                          )[0].Champion +
                          ' ' +
                          player.queues.sort(
                            (champ1, champ2) => champ2.Kills - champ1.Kills,
                          )[0].Kills
                        : 'None',
                    player2Value:
                      player2.queues.length !== 0
                        ? player2.queues.sort(
                            (champ1, champ2) => champ2.Kills - champ1.Kills,
                          )[0].Champion +
                          ' ' +
                          player2.queues.sort(
                            (champ1, champ2) => champ2.Kills - champ1.Kills,
                          )[0].Kills
                        : 'None',
                  },
                  {
                    title: 'Highest deaths champion',
                    player1Value:
                      player.queues.length !== 0
                        ? player.queues.sort(
                            (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                          )[0].Champion +
                          ' ' +
                          player.queues.sort(
                            (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                          )[0].Deaths
                        : 'None',
                    player2Value:
                      player2.queues.length !== 0
                        ? player2.queues.sort(
                            (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                          )[0].Champion +
                          ' ' +
                          player2.queues.sort(
                            (champ1, champ2) => champ2.Deaths - champ1.Deaths,
                          )[0].Deaths
                        : 'None',
                  },
                  {
                    title: 'Champion with best KDA',
                    player1Value:
                      champWithBestKDA == 'None'
                        ? 'None'
                        : champWithBestKDA.Champion +
                          ' ' +
                          (
                            (champWithBestKDA.Deaths +
                              0.5 * champWithBestKDA.Assists) /
                            champWithBestKDA.Deaths
                          ).toFixed(2),
                    player2Value:
                      champWithBestKDA2 == 'None'
                        ? 'None'
                        : champWithBestKDA2.Champion +
                          ' ' +
                          (
                            (champWithBestKDA2.Deaths +
                              0.5 * champWithBestKDA2.Assists) /
                            champWithBestKDA2.Deaths
                          ).toFixed(2),
                  },
                  {
                    title: 'Best winrate',
                    player1Value:
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
                    player2Value:
                      champWithBestWinrate2 == 'None'
                        ? 'None'
                        : champWithBestWinrate2.Champion +
                          ' ' +
                          (
                            (champWithBestWinrate2.Wins /
                              (champWithBestWinrate2.Wins +
                                champWithBestWinrate2.Losses)) *
                            100
                          ).toFixed(2) +
                          '%',
                  },
                  {
                    title: 'Most played class',
                    player1Value:
                      typeStats == 'None'
                        ? 'None'
                        : typeStats.bestType +
                          ' ' +
                          Math.round(typeStats.bestTypeValue / 60) +
                          'h',
                    player2Value:
                      typeStats2 == 'None'
                        ? 'None'
                        : typeStats2.bestType +
                          ' ' +
                          Math.round(typeStats2.bestTypeValue / 60) +
                          'h',
                  },
                  {
                    title: 'Less played class',
                    player1Value:
                      typeStats == 'None'
                        ? 'None'
                        : typeStats.worstType +
                          ' ' +
                          (Math.round(typeStats.worstTypeValue / 60) + 'h'),
                    player2Value:
                      typeStats2 == 'None'
                        ? 'None'
                        : typeStats2.worstType +
                          ' ' +
                          (Math.round(typeStats2.worstTypeValue / 60) + 'h'),
                  },
                ]}
                columns={[
                  { id: 'title', label: 'Champions', minWidth: 120 },
                  {
                    id: 'player1Value',
                    label: '',
                    minWidth: width <= 700 ? 65 : 130,
                    align: 'right',
                  },
                  {
                    id: 'player2Value',
                    label: '',
                    minWidth: 100,
                    align: 'right',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayersComparing;
