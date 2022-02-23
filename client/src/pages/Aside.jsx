/* eslint-disable operator-linebreak */
import { useState, useEffect, useRef } from 'react';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_EVENTS } from '../query/events';
import Timer from '../components/Timer';

const Asidecontent = (props) => {
  const [time, setTime] = useState({});
  const [timeLeft1, setTimeLeft1] = useState({});
  const [timeLeft2, setTimeLeft2] = useState({});
  const [timeEvents, setTimeEvents] = useState([]);
  const [getEvents, { loading, error, data }] = useLazyQuery(GET_EVENTS, {
    errorPolicy: 'all',
  });

  useEffect(async () => {
    const answer = await getEvents();
    setTimeEvents(answer.data.getAllEvents);
  }, []);

  useEffect(() => {}, [timeEvents]);

  const calculateTimeLeft = (date) => {
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
        title: new Date(date).toUTCString(),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    if (timeEvents.length === 0) return;
    const timer = setTimeout(() => {
      setTimeLeft1(calculateTimeLeft(timeEvents[0].ends));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft1, timeEvents]);

  return (
    <>
      <div className='menu-container'>
        <div className='menu-entry'>
          <Link to='/' className='entry-title'>
            Home
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'entry-link active-link' : 'entry-link'
            }
            to='players#playersearch'
            onClick={props.closeMenu}
          >
            Search player
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'entry-link active-link' : 'entry-link'
            }
            to='players#faq'
            onClick={props.closeMenu}
          >
            FAQ
          </NavLink>
        </div>
        {
          //   <div className='menu-entry'>
          //   <Link to='/' className='entry-title'>
          //     Info
          //   </Link>
          //   <NavLink
          //     className={({ isActive }) =>
          //       isActive ? 'entry-link active-link' : 'entry-link'
          //     }
          //     to='/patchnotes'
          //     onClick={props.closeMenu}
          //   >
          //     Patch Notes
          //   </NavLink>
          // </div>
        }
        <div className='menu-entry'>
          <Link to='/' className='entry-title'>
            Tools
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'entry-link active-link' : 'entry-link'
            }
            to='/randomchampion'
            onClick={props.closeMenu}
          >
            Random Champion Wheel
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'entry-link active-link' : 'entry-link'
            }
            to='/compare'
            onClick={props.closeMenu}
          >
            Compare Players
          </NavLink>
        </div>
        <div className='menu-entry'>
          <Link to='/' className='entry-title'>
            Timers
          </Link>
          <Timer time={timeEvents[0]} timeLeft={timeLeft1} color='orange' />
        </div>
        {props.width <= 1199 ? (
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
        ) : (
          ''
        )}
      </div>
      <div className='footer-container'>
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
      </div>
    </>
  );
};

export default Asidecontent;
