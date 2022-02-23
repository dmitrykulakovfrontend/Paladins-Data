import React from 'react';

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ErrorIcon from '@mui/icons-material/Error';

const CardStatContent = ({
  firstTitle,
  firstValue,
  secondTitle,
  secondValue,
  tooltip,
  tooltip2,
  width,
  margin,
}) => {
  return (
    <div className='card-stat-content'>
      <div className='card-stat-data'>
        <div className='showcase-entry'>
          <p className='showcase-entry-label'>
            {firstTitle}{' '}
            {tooltip && (
              <Tooltip title={tooltip.data} placement='top' disableInteractive>
                <IconButton color={tooltip.type} edge='start' size='small'>
                  {tooltip.type === 'error' ? (
                    <ErrorIcon
                      sx={{
                        fontSize: 15,
                        position: 'absolute',
                        bottom: '5px',
                        left: '4px',
                      }}
                    ></ErrorIcon>
                  ) : (
                    <HelpIcon
                      sx={{
                        fontSize: 15,
                        position: 'absolute',
                        bottom: '5px',
                        left: '4px',
                      }}
                    ></HelpIcon>
                  )}
                </IconButton>
              </Tooltip>
            )}
          </p>
          <p className='showcase-entry-data'>
            {firstValue}
            {width <= 850 ? <br /> : ''}
          </p>
        </div>
        <div className='showcase-entry'>
          <p
            className='showcase-entry-label'
            style={margin || { marginTop: '25px' }}
          >
            {secondTitle}
            {tooltip2 && (
              <Tooltip title={tooltip2.data} placement='top' disableInteractive>
                <IconButton color={tooltip2.type} edge='start' size='small'>
                  {tooltip2.type === 'error' ? (
                    <ErrorIcon
                      sx={{
                        fontSize: 15,
                        position: 'absolute',
                        bottom: '5px',
                        left: '4px',
                      }}
                    ></ErrorIcon>
                  ) : (
                    <HelpIcon
                      sx={{
                        fontSize: 15,
                        position: 'absolute',
                        bottom: '5px',
                        left: '4px',
                      }}
                    ></HelpIcon>
                  )}
                </IconButton>
              </Tooltip>
            )}
          </p>
          {typeof secondValue !== 'object' ? (
            <p className='showcase-entry-data'>{secondValue}</p>
          ) : (
            <div style={{ display: `flex`, alignItems: `center` }}>
              <div
                style={{
                  backgroundColor: `rgb(0, 0, 0)`,
                  overflow: `hidden`,
                  borderRadius: `50px`,
                  height: `8px`,
                  width: `80px`,
                }}
              >
                <div
                  style={{
                    backgroundColor: `rgb(45, 115, 255)`,
                    height: `8px`,
                    width: `${secondValue.data}%`,
                    transform: `translateX(0%)`,
                  }}
                ></div>
              </div>
              <p
                style={{
                  color: `rgb(136, 136, 136)`,
                  fontSize: `12px`,
                  margin: `0px 0px 0px 5px`,
                  whiteSpace: `nowrap`,
                }}
              >
                {secondValue.data}%{' '}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardStatContent;
