/* eslint-disable operator-linebreak */
import { useState, useEffect } from 'react';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../query/events';
import Timer from '../components/Timer';
import { calculateTimeLeft } from '../helpers';
import { v4 as uuid4 } from 'uuid';

const Asidecontent = ({ width, closeMenu }) => {
  const [timeEvents, setTimeEvents] = useState([]);
  const { loading, error, data } = useQuery(GET_EVENTS);

  const isActiveLink = ({ isActive }) =>
    isActive ? 'entry-link active-link' : 'entry-link';

  useEffect(() => data && setTimeEvents(data.getAllEvents), [data]);

  useEffect(() => {
    if (!timeEvents) return;
    const timer = setTimeout(() => {
      const newTimeEvents = [];

      timeEvents.forEach((event) => {
        const newEvent = JSON.parse(JSON.stringify(event));
        newEvent.timeLeft = calculateTimeLeft(event.ends);
        newTimeEvents.push(newEvent);
      });

      setTimeEvents(newTimeEvents);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeEvents]);

  return (
    <>
      <nav className='menu-container'>
        <div className='menu-entry'>
          <h3 className='entry-title'>Home</h3>
          <NavLink
            className={isActiveLink}
            to='players#playersearch'
            onClick={closeMenu}
          >
            Search player
          </NavLink>
          <NavLink
            className={isActiveLink}
            to='players#faq'
            onClick={closeMenu}
          >
            FAQ
          </NavLink>
        </div>

        <div className='menu-entry'>
          <h3 className='entry-title'>Info</h3>
          <NavLink className={isActiveLink} to='/champions' onClick={closeMenu}>
            Champions
          </NavLink>
        </div>

        <div className='menu-entry'>
          <h3 className='entry-title'>Tools</h3>
          <NavLink
            className={isActiveLink}
            to='/randomchampion'
            onClick={closeMenu}
          >
            Random Champion Wheel
          </NavLink>
          <NavLink className={isActiveLink} to='/compare' onClick={closeMenu}>
            Compare Players
          </NavLink>
        </div>

        <div className='menu-entry'>
          <h3 className='entry-title'>Timers</h3>
          {timeEvents.map((event) => (
            <Timer event={event} color='orange' key={uuid4()} />
          ))}
        </div>

        {width <= 1199 && (
          <div className='menu-entry'>
            <p className='entry-title'>Socials</p>
            <div className='social-container'>
              <a href='#'>
                <BsDiscord />
              </a>
              <a href='https://github.com/AtomEistee'>
                <BsGithub />
              </a>
            </div>
          </div>
        )}
      </nav>

      <footer className='footer-container'>
        <div className='line-grey'></div>
        <div className='warning'>
          This website is NOT affiliated with Steam or Evil Mojo.
        </div>
        <div className='warning'>Data provided by Hi-Rez Studios.</div>
        <div className='copyright'>
          <p>
            © Copyright AtomEistee (code) & Yimerin (design){' '}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Asidecontent;
