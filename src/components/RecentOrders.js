import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

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
  const [pagination, setPagination] = React.useState({
    page: 0,
    size:  10,
   })
   const [data, setData] = React.useState([])

  React.useEffect(()=>{
    const savedToken = localStorage.getItem('token');
    axios.get("http://localhost:8080/rest/api/user/getUsersList", {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
      params: {...pagination, page: pagination.page + 1}
    }).then(response => setData(response.data.content))
  },[pagination])

const handleChangePagination = (value , type) => {
  setPagination({...pagination, [type]: value });
  console.log(pagination)
  
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
              .map((row) => {
                return (
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.totalElements}
        rowsPerPage={pagination.size}
        page={pagination.page}
        onPageChange={()=>handleChangePagination('page')}
        onRowsPerPageChange={()=>handleChangePagination('rowsPerPage')}
      />
    </Paper>
  );
}