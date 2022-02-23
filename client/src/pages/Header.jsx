/* eslint-disable operator-linebreak */
import { useState, useEffect, useRef } from 'react';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import Aside from './Aside';

const Header = (props) => {
  const [isActiveMenu, setActiveMenu] = useState(false);
  const [players, setPlayers] = useState('');

  const toggleMenu = () => {
    setActiveMenu(!isActiveMenu);
  };

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
        {props.width >= 1199 ? (
          ''
        ) : (
          <div
            className={
              isActiveMenu ? 'burger-container active' : 'burger-container'
            }
            onClick={toggleMenu}
          >
            <GiHamburgerMenu style={{ color: '#ccc' }} />
          </div>
        )}
        {props.width >= 1199 ? (
          ''
        ) : (
          <div
            className={
              isActiveMenu
                ? 'aside aside-m slide-in'
                : 'aside aside-m slide-out'
            }
          >
            <Aside width={props.width} closeMenu={toggleMenu} />
          </div>
        )}
        <div className='logo-container'>
          <MdOutlineAutoGraph className='icon' />
          <p className='logo-text'>Paladins Data</p>
        </div>
        <div className='players-container'>
          <p> Players Online:</p>
          <p className='logo-text'>{players ? players : 'Fetching...'}</p>
        </div>
        {props.width >= 1199 ? (
          <div className='social-container'>
            <a href='#'>
              <BsDiscord />
            </a>
            <a href='https://github.com/AtomEistee'>
              <BsGithub />
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='line-crimson'></div>
    </header>
  );
};

export default Header;
