/* eslint-disable operator-linebreak */
import { useState, useEffect, useRef } from 'react';
import { MdOutlineAutoGraph, MdMail } from 'react-icons/md';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import Aside from './Aside';

const Header = ({ width }) => {
  const [isActiveMenu, setActiveMenu] = useState(false);
  const [players, setPlayers] = useState('Fetching...');

  useEffect(() => {
    fetch(`/onlinePlayers`).then((response) => {
      response.json().then((data) => {
        setPlayers(data);
      });
    });
  }, []);

  return (
    <header className='header-container'>
      <div className='nav-container'>
        {width <= 1199 && (
          <div
            className={
              isActiveMenu ? 'burger-container active' : 'burger-container'
            }
            onClick={() => setActiveMenu(!isActiveMenu)}
          >
            <GiHamburgerMenu style={{ color: '#ccc' }} />
          </div>
        )}
        {width <= 1199 && (
          <div
            className={
              isActiveMenu
                ? 'aside aside-m slide-in'
                : 'aside aside-m slide-out'
            }
          >
            <Aside
              width={width}
              closeMenu={() => setActiveMenu(!isActiveMenu)}
            />
          </div>
        )}
        <div className='logo-container'>
          <MdOutlineAutoGraph className='icon' />
          <p className='logo-text'>Paladins Data</p>
        </div>
        <div className='players-container'>
          <p> Players Online:</p>
          <p className='logo-text'>{players}</p>
        </div>
        {width >= 1199 && (
          <div className='social-container'>
            <a href='mailto:atomeistee@gmail.com'>
              <MdMail />
            </a>
            <a href='https://github.com/AtomEistee'>
              <BsGithub />
            </a>
          </div>
        )}
      </div>
      <div className='line-crimson'></div>
    </header>
  );
};

export default Header;
