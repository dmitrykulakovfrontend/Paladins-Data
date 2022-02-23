import _ from 'lodash';

const championsType = {
  Ash: 'Front Line',
  Atlas: 'Front Line',
  Azaan: 'Front Line',
  Barik: 'Front Line',
  Fernando: 'Front Line',
  Inara: 'Front Line',
  Khan: 'Front Line',
  Makoa: 'Front Line',
  Raum: 'Front Line',
  Ruckus: 'Front Line',
  Terminus: 'Front Line',
  Torvald: 'Front Line',
  Yagorath: 'Front Line',
  'Bomb King': 'Damage',
  Cassie: 'Damage',
  Dredge: 'Damage',
  Drogoz: 'Damage',
  Imani: 'Damage',
  Kinessa: 'Damage',
  Lian: 'Damage',
  Octavia: 'Damage',
  Saati: 'Damage',
  'Sha Lin': 'Damage',
  Strix: 'Damage',
  Tiberius: 'Damage',
  Tyra: 'Damage',
  Viktor: 'Damage',
  Vivian: 'Damage',
  Willo: 'Damage',
  Corvus: 'Support',
  Furia: 'Support',
  Grohk: 'Support',
  Grover: 'Support',
  Io: 'Support',
  Jenos: 'Support',
  "Mal'Damba": 'Support',
  Pip: 'Support',
  Rei: 'Support',
  Seris: 'Support',
  Ying: 'Support',
  Androxus: 'Flank',
  Buck: 'Flank',
  Evie: 'Flank',
  Koga: 'Flank',
  Lex: 'Flank',
  Maeve: 'Flank',
  Moji: 'Flank',
  Skye: 'Flank',
  Talus: 'Flank',
  VII: 'Flank',
  Vatu: 'Flank',
  Vora: 'Flank',
  Zhin: 'Flank',
};

export const combineQueues = (...queues) => {
  const badArray = [];

  for (let i = 0; i < queues.length; i++) {
    badArray.push(...queues[i]);
  }

  const bigArray = _.cloneDeep(badArray);

  const result = [];

  for (
    let championIndex = 0;
    championIndex < bigArray.length;
    championIndex++
  ) {
    let ExistingIndex = result.findIndex(
      (champion) => champion.Champion === bigArray[championIndex].Champion,
    );
    if (ExistingIndex !== -1) {
      for (let [key, value] of Object.entries(bigArray[championIndex])) {
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
      result.push(bigArray[championIndex]);
    }
  }
  const finalResults = [];
  const results = result.sort(sortByChampName).forEach((champion) => {
    champion.Winrate = (
      (champion.Wins / (champion.Wins + champion.Losses)) *
      100
    ).toFixed(2);
    champion.KDA = (
      (champion.Kills + 0.5 * champion.Assists) /
      champion.Deaths
    ).toFixed(2);
    champion.type = championsType[champion.Champion];
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
    types[champion.type] += champion.Minutes;
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
