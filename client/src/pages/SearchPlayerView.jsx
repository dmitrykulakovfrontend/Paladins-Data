import { Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { HiChevronDoubleRight } from 'react-icons/hi';
import Tooltip from '@mui/material/Tooltip';

const SearchPlayerView = ({
  handleKeyPress,
  handleClick,
  isSearchingPlayer,
  isPlayerNotFound,
  isTooltipOpen,
  input,
  switchComparing,
  handleChange,
}) => {
  return (
    <Fragment>
      <div className='search-container'>
        <div
          onKeyDown={isSearchingPlayer ? undefined : handleKeyPress}
          className={
            isPlayerNotFound
              ? 'search-bar standalone error'
              : 'search-bar standalone'
          }
        >
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  color: '#ccc',
                  backgroundColor: '#363636',
                  fontSize: '12px',
                  padding: '0.5em',
                },
              },
            }}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => setState({ ...state, isTooltipOpen: false })}
            open={isTooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title='Atleast 2 symbols.'
            placement='left'
          >
            <input
              type='text'
              name='playerinfo'
              placeholder='Enter Username or Match ID'
              value={input}
              onChange={handleChange}
            />
          </Tooltip>
          <button
            aria-label='Search'
            type='button'
            onClick={isSearchingPlayer ? undefined : handleClick}
          >
            {isSearchingPlayer ? (
              <CircularProgress color={`info`} size={25} />
            ) : (
              <HiChevronDoubleRight style={{ fontSize: '30px' }} />
            )}
          </button>
        </div>
      </div>
      <div className='separator-word'>
        <div className='line-crimson-right'></div>
        <span></span>
        <div className='line-crimson-left'></div>
      </div>
      <button className='light-button' onClick={switchComparing}>
        compare with others
      </button>
    </Fragment>
  );
};

export default SearchPlayerView;
