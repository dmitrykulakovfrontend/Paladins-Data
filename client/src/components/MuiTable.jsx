import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MuiTable = (props) => {
  const columns = props.columns;

  const rows = props.rows;

  return (
    <Paper
      sx={{
        backgroundColor: '#1b1d20',
        color: '#888',
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }} onClick={props.showTable}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={
                    column.id +
                    new Date().getMilliseconds +
                    Math.random() * 2000
                  }
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: '#888',
                    backgroundColor: '#1b1d20',
                    border: 'none',
                    fontSize: '12px',
                    padding: '0 0 0 4px',
                    fontWeight: 'bold',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={new Date().getMilliseconds + Math.random() * 2000}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={new Date().getMilliseconds + Math.random() * 2000}
                        align={column.align}
                        style={{
                          color: '#888',
                          border: 'none',
                          fontSize: '12px',
                          padding: '3px 3px 3px 10px',
                        }}
                      >
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MuiTable;
