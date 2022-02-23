import { useState, useMemo } from 'react';
import { v4 as uuid4 } from 'uuid';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect } from 'react';

const ChampionsTable = ({ queue, width }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [champions, setChampions] = useState(queue);

  useMemo(() => {
    let sortedChampions = [...champions];
    if (sortConfig !== null) {
      setChampions(
        champions.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          return 0;
        }),
      );
    }
    return sortedChampions;
  }, [champions, sortConfig]);
  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig !== null &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className='table-wrapper'>
      <div className='table-wrapper-header'>
        <div className='table-wrapper-header-label'>Champions</div>
        <div className='profile-label'>
          <div className='empty'></div>
        </div>
      </div>
      <div className='champions-table'>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('Champion')}>
                Champion
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Champion' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Matches')}>
                Matches
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Matches' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Wins')}>
                Wins
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Wins' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Losses')}>
                Losses
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Losses' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Winrate')}>
                Winrate
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Winrate' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Kills')}>
                Kills
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Kills' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Deaths')}>
                Deaths
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Deaths' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Assists')}>
                Assists
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Assists' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('KDA')}>
                KDA
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'KDA' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
              <th onClick={() => requestSort('Minutes')}>
                Playtime
                {sortConfig === null ? (
                  <ArrowDropUpIcon />
                ) : sortConfig.direction === 'ascending' &&
                  sortConfig.key === 'Minutes' ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {champions.map((champion) => {
              return (
                <tr key={uuid4()}>
                  <td>
                    <img
                      src={`https://webcdn.hirezstudios.com/paladins/champion-icons/${champion.Champion.toLowerCase().replace(
                        /\s/g,
                        '-',
                      )}.jpg`}
                      width='50'
                      height='50'
                    ></img>
                    <p>{champion.Champion}</p>
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Matches') : undefined
                    }
                  >
                    {champion.Matches}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Matches' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Wins') : undefined
                    }
                  >
                    {champion.Wins}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Wins' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Losses') : undefined
                    }
                  >
                    {champion.Losses}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Losses' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Winrate') : undefined
                    }
                  >
                    {champion.Winrate}%
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Winrate' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Kills') : undefined
                    }
                  >
                    {champion.Kills}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Kills' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Deaths') : undefined
                    }
                  >
                    {champion.Deaths}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Deaths' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Assists') : undefined
                    }
                  >
                    {champion.Assists}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Assists' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('KDA') : undefined
                    }
                  >
                    {champion.KDA}
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'KDA' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                  <td
                    onClick={
                      width <= 760 ? () => requestSort('Minutes') : undefined
                    }
                  >
                    {Math.round(champion.Minutes / 60)}h
                    {width <= 760 ? (
                      sortConfig === null ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.direction === 'ascending' &&
                        sortConfig.key === 'Minutes' ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChampionsTable;
