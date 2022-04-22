import _ from 'lodash';

export const calculateTimeLeft = (date) => {
  const difference = +new Date(date) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours:
        Math.floor((difference / (1000 * 60 * 60)) % 24) < 10
          ? '0' + Math.floor((difference / (1000 * 60 * 60)) % 24)
          : Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes:
        Math.floor((difference / 1000 / 60) % 60) < 10
          ? '0' + Math.floor((difference / 1000 / 60) % 60)
          : Math.floor((difference / 1000 / 60) % 60),
      seconds:
        Math.floor((difference / 1000) % 60) < 10
          ? '0' + Math.floor((difference / 1000) % 60)
          : Math.floor((difference / 1000) % 60),
      tooltipTitle: new Date(date).toUTCString(),
    };
  }
  return timeLeft;
};

export const combineQueues = (rolesList, ...queues) => {
  const arr = [];

  for (let i = 0; i < queues.length; i++) {
    arr.push(...queues[i]);
  }

  const queuesArr = _.cloneDeep(arr);

  const result = [];

  for (
    let championIndex = 0;
    championIndex < queuesArr.length;
    championIndex++
  ) {
    let ExistingIndex = result.findIndex(
      (champion) => champion.Champion === queuesArr[championIndex].Champion,
    );
    if (ExistingIndex !== -1) {
      for (let [key, value] of Object.entries(queuesArr[championIndex])) {
        if (key === 'Champion') {
          continue;
        }
        if (key === 'player_id') {
          continue;
        }
        if (key === 'ChampionId') {
          continue;
        }
        if (key === '__typename') {
          continue;
        }
        if ((key === 'ret_msg') & (value !== null)) {
          throw Error(`ERROR: ${value}`);
        }
        if (key === 'LastPlayed') {
          let previousDate = new Date(result[ExistingIndex][key]);
          let newDate = new Date(value);
          if (previousDate - newDate < 0) {
            result[ExistingIndex][key] = value;
            continue;
          } else {
            continue;
          }
        }
        result[ExistingIndex][key] += value;
      }
    } else {
      result.push(queuesArr[championIndex]);
    }
  }
  const finalResults = [];
  result.sort(sortByChampName).forEach((champion) => {
    champion.Winrate = (
      (champion.Wins / (champion.Wins + champion.Losses)) *
      100
    ).toFixed(2);
    champion.KDA = (
      (champion.Kills + 0.5 * champion.Assists) /
      champion.Deaths
    ).toFixed(2);

      const role = rolesList.find(champ => champ.Name_English === champion.Champion).Roles;

    switch (role) {
      case 'Paladins Flanker':
        champion.Role = 'Flank';
        break;
      case 'Paladins Front Line':
        champion.Role = 'Front Line';
        break;
      default:
        champion.Role = role.split(' ')[1];
    }
    finalResults.push(champion);
  });
  return finalResults;
};

export const sortByChampName = (champion1, champion2) => {
  if (champion1.Champion < champion2.Champion) {
    return -1;
  }
  if (champion1.Champion > champion2.Champion) {
    return 1;
  }
  return 0;
};

export const makeOverallStats = (arrWithChamps) => {
  const result = {
    Assists: 0,
    Deaths: 0,
    Gold: 0,
    Kills: 0,
    Losses: 0,
    Matches: 0,
    Minutes: 0,
    Wins: 0,
  };
  arrWithChamps.forEach((champion) => {
    result.Assists += champion.Assists;
    result.Deaths += champion.Deaths;
    result.Gold += champion.Gold;
    result.Kills += champion.Kills;
    result.Losses += champion.Losses;
    result.Matches += champion.Matches;
    result.Minutes += champion.Minutes;
    result.Wins += champion.Wins;
  });

  return result;
};

export const countBestWinrate = (queues) => {
  let champ = queues
    .sort(
      (champ1, champ2) =>
        champ2.Wins / (champ2.Wins + champ2.Losses) -
        champ1.Wins / (champ1.Wins + champ1.Losses),
    )
    .filter((champ) => champ.Minutes > 60)[0];
  if (!champ) {
    champ = queues.sort(
      (champ1, champ2) =>
        champ2.Wins / (champ2.Wins + champ2.Losses) -
        champ1.Wins / (champ1.Wins + champ1.Losses),
    )[0];
  }
  return champ;
};

export const countBestKDA = (queues) => {
  let champ = queues
    .sort(
      (champ1, champ2) =>
        (champ2.Kills + 0.5 * champ2.Assists) / champ2.Deaths -
        (champ1.Kills + 0.5 * champ1.Assists) / champ1.Deaths,
    )
    .filter((champ) => champ.Minutes > 60)[0];
  if (!champ) {
    champ = queues.sort(
      (champ1, champ2) =>
        (champ2.Kills + 0.5 * champ2.Assists) / champ2.Deaths -
        (champ1.Kills + 0.5 * champ1.Assists) / champ1.Deaths,
    )[0];
  }
  return champ;
};

export const countMostPlayedType = (queues) => {
  let types = {
    Damage: 0,
    Flank: 0,
    'Front Line': 0,
    Support: 0,
  };

  queues.forEach((champion) => {
    types[champion.Role] += champion.Minutes;
  });
  let best = 0;
  let type = '';
  let worst = 99999999999;
  let type2 = '';
  for (let [key, value] of Object.entries(types)) {
    if (best < value) {
      type = key;
      best = value;
    }
    if (worst > value) {
      type2 = key;
      worst = value;
    }
  }
  return {
    bestType: type,
    bestTypeValue: best,
    worstType: type2,
    worstTypeValue: worst,
  };
};
