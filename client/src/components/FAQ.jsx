import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
const FAQ = () => {
  const [active, setActive] = useState({
    item1: false,
    item2: false,
    item3: false,
  });

  const toggleActive = (id) =>
    setActive({
      ...active,
      [id]: !active[id],
    });
  return (
    <div className='card-container faq'>
      <h3 className='card-header middle' id='faq'>
        Frequently Asked Questions
      </h3>
      <div className='line-grey'></div>
      <div className='accordion-container'>
        <div className='p-accordion p-component'>
          <div
            className={
              active.item1
                ? 'p-accordion-tab p-accordion-tab-active'
                : 'p-accordion-tab'
            }
          >
            <div
              className='p-accordion-header'
              onClick={() => toggleActive('item1')}
            >
              <a href='#' className='p-accordion-header-link'>
                <span className='p-accordion-header-text'>
                  How do I make my profile public?
                </span>
              </a>
            </div>
            {active.item1 ? (
              <div
                id='pr_id_3_content_0'
                className='p-toggleable-content
            p-toggleable-content-enter-done'
                role='region'
                aria-labelledby='pr_id_3_header_0'
              >
                <div className='p-accordion-content'>
                  <p>
                    You can un-hide your profile via the in-game profile screen.
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className={
              active.item2
                ? 'p-accordion-tab p-accordion-tab-active'
                : 'p-accordion-tab'
            }
          >
            <div
              className='p-accordion-header'
              onClick={() => toggleActive('item2')}
            >
              <a href='#' to='' className='p-accordion-header-link'>
                <span className='p-accordion-header-text'>
                  When profiles updating?
                </span>
              </a>
            </div>
            {active.item2 ? (
              <div
                id='pr_id_3_content_0'
                className='p-toggleable-content
            p-toggleable-content-enter-done'
                role='region'
                aria-labelledby='pr_id_3_header_0'
              >
                <div className='p-accordion-content'>
                  <p>
                    An update for a profile can be fetched every 30 minutes to
                    prevent excessive API calls. Profiles are automatically
                    updated, if it is not updating this is probably because your
                    profile is hidden or due to temporary a issue with HiRez's
                    API (This is common during patch days).
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className={
              active.item3
                ? 'p-accordion-tab p-accordion-tab-active'
                : 'p-accordion-tab'
            }
          >
            <div
              className='p-accordion-header'
              onClick={() => toggleActive('item3')}
            >
              <a href='#' to='' className='p-accordion-header-link'>
                <span className='p-accordion-header-text'>
                  Is consoles supported?
                </span>
              </a>
            </div>
            {active.item3 ? (
              <div
                id='pr_id_3_content_0'
                className='p-toggleable-content
            p-toggleable-content-enter-done'
                role='region'
                aria-labelledby='pr_id_3_header_0'
              >
                <div className='p-accordion-content'>
                  <p>No {':('}</p>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
