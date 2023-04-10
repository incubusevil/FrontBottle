import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

const columns = [
  { id: 'email', label: 'Email', minWidth: 120 },
  { id: 'firstName', label: 'First Name', minWidth: 120 },
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 120,
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 100,
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    minWidth: 120,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'company',
    label: 'Company Name',
    minWidth: 100,
  },
];

export default function RecentOrder() {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    axios.get('http://localhost:8080/rest/api/user/getUsersList', {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
      params: { ...pagination, page: pagination.page + 1 },
    }).then((response) => setData(response.data.content));
  }, [pagination]);

  const handleChangePagination = (value, type) => {
    setPagination({ ...pagination, [type]: value });
    console.log(pagination);

    console.log(data);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.totalElements}
        rowsPerPage={pagination.size}
        page={pagination.page}
        onPageChange={() => handleChangePagination('page')}
        onRowsPerPageChange={() => handleChangePagination('rowsPerPage')}
      />
    </Paper>
  );
}
