import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';

const columns = [
    { id: 'profilePhotoPath', label: 'Profile Photo', minWidth: 120 },
    { id: 'email', label: 'Email', minWidth: 120 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
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
    {
      id: 'accountStatus',
      label: 'Account Status',
      minWidth: 100,
    },
  ];

export default function CustomersOrder() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [data, setData] = React.useState([])
  const [count, setCount] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(()=>{
    const savedToken = localStorage.getItem('token');
    axios.get("http://localhost:8080/rest/api/user/getUsersList", {
      headers: {
               Authorization: `Bearer ${savedToken}`,
             },
      params: {size: rowsPerPage, page: page + 1}
    }).then(response => {setData(response.data.content)
                        setCount(response.data)}
    )
  },[page,rowsPerPage])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700, maxWidth: 1800 }}>
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
              <TableCell>
                    Apply Changes
                  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                       Edit Order
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count.totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Container>
  )
  }