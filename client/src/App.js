import { useState, useEffect } from 'react';

import Header from './pages/Header';
import Aside from './pages/Aside';
import Main from './pages/Main';
import RandomChampionWheel from './pages/RandomChampionWheel';
import PlayerContent from './pages/PlayerContent';
import PlayersComparing from './pages/PlayersComparing';
import NotFound from './pages/NotFound.jsx';
import { Routes, Route } from 'react-router-dom';
import ChampionsInfo from './pages/ChampionsInfo.jsx';

const App = () => {
  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setwidth(window.innerWidth));
  }, [width]);
  return (
    <div>
      <Header width={width} />
      <main className='main-wrapper'>
        {width >= 1199 && (
          <div className='aside-container'>
            <div className='aside-content'>
              <Aside width={width} />
            </div>
          </div>
        )}

        <div className='main-content-container'>
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<Main comparing={false} />} />
              <Route path='/players' element={<Main comparing={false} />} />
              <Route
                path='/randomchampion'
                element={<RandomChampionWheel width={width} />}
              />
              <Route path='/champions' element={<ChampionsInfo />} />
              <Route
                path='/players/:id'
                element={<PlayerContent width={width} />}
              />
              <Route path='/compare' element={<Main comparing={true} />} />
              <Route
                path='/players/compare/:slug'
                element={<PlayersComparing width={width} />}
              />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
