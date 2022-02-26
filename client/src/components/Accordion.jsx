import React, { useEffect, useState } from 'react';
import { BiRun } from 'react-icons/bi';
import { GiHealthNormal } from 'react-icons/gi';
import { v4 as uuid4 } from 'uuid';

const Accordion = ({ champion }) => {
  const [isActive, setIsActive] = useState(false);

  let role = '';
  let { Ability_1, Ability_2, Ability_3, Ability_4, Ability_5 } = champion;
  const abilities = [Ability_1, Ability_2, Ability_3, Ability_4, Ability_5];

  switch (champion.Roles) {
    case 'Paladins Flanker':
      role = 'Flank';
      break;
    case 'Paladins Front Line':
      role = 'Front Line';
      break;
    default:
      role = champion.Roles.split(' ')[1];
  }

  return (
    <div
      class='accordion-container'
      style={isActive ? { maxWidth: '100%' } : {}}
    >
      <div class='p-accordion p-component'>
        <div class='p-accordion-tab'>
          <div
            class='p-accordion-header'
            onClick={() => setIsActive(!isActive)}
          >
            <a class='p-accordion-header-link'>
              <span
                class='p-accordion-header-text'
                style={
                  isActive
                    ? { justifyContent: 'center', alignItems: 'center' }
                    : {}
                }
              >
                <div class='champion-bg'>
                  <img alt='' src={champion.ChampionIcon_URL} />
                </div>
                <div
                  class='champion-info'
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div class='name'>
                    {champion.Name_English} – {champion.Title}
                  </div>
                  <div class='champ-class'>{role}</div>
                  <div
                    class='champ-speed'
                    style={{
                      alignSelf: `center`,
                      justifySelf: `center`,
                    }}
                  >
                    <BiRun /> {champion.Speed}
                  </div>
                  <div
                    class='champ-health'
                    style={{
                      alignSelf: `center`,
                      justifySelf: `center`,
                    }}
                  >
                    <GiHealthNormal /> {champion.Health}
                  </div>
                </div>
              </span>
            </a>
          </div>
          {isActive && (
            <div className='p-accordion-content'>
              <p className='Lore' style={{ marginBottom: '10px' }}>
                {champion.Lore}
              </p>
              {abilities.map((ability) => {
                return (
                  <div
                    className='ability'
                    style={{
                      display: 'flex',
                      padding: '15px',
                      alignItems: 'center',
                      border: '2px solid #40454e',
                      margin: '10px 0',
                    }}
                    pk={uuid4()}
                  >
                    <div
                      className='icon'
                      style={{
                        display: 'flex',
                        marginRight: '10px',
                        flexDirection: 'column',
                        maxWidth: '100px',
                      }}
                    >
                      <img src={ability.URL} width='100' height='100' />
                      <p>Damage Type: {ability.damageType}</p>
                    </div>
                    <div
                      className='information'
                      style={{
                        display: `flex`,
                        flexDirection: `column`,
                        width: '100%',
                        height: '132px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        className='name'
                        style={{ alignSelf: 'center', marginBottom: '5px' }}
                      >
                        <p className='name' style={{}}>
                          {ability.Summary}
                        </p>
                      </div>
                      <div className='description'>
                        <p className='description'>
                          {ability.Description.replaceAll(
                            '<br>',
                            '',
                          ).replaceAll('--', '–')}
                        </p>
                      </div>
                      <div
                        className='cooldown'
                        style={{
                          alignSelf: `end`,
                          justifySelf: `end`,
                        }}
                      >
                        <p
                          className='cooldown'
                          style={{ minWidth: 'max-content' }}
                        >
                          {' '}
                          {ability.rechargeSeconds === 0
                            ? 'No cooldown'
                            : `Cooldown: ${ability.rechargeSeconds}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
