import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { OrderManagerRow } from './OrderManagerRow';

const columns = [
  { id: 'orderId', label: 'Order Id', minWidth: 120 },
  { id: 'email', label: 'Email', minWidth: 120 },
  {
    id: 'deliveryAddress',
    label: 'Delivery Address',
    minWidth: 120,
  },
  {
    id: 'createdDate',
    label: 'Created Date',
    minWidth: 100,
  },
  {
    id: 'status',
    label: 'Order Status',
    minWidth: 120,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'editCustomer',
    label: 'Edit Customer',
    minWidth: 100,
  },
];

export default function OrderManagerPanel() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const savedToken = localStorage.getItem('token');
    axios.get('http://localhost:8080/rest/api/customer/order/getListOfOrdersForManager', {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
      params: { size: rowsPerPage, page: page + 1 },
    }).then((response) => {
      setData(response.data.content);
      setCount(response.data);
      console.log(response.data.content);
    });
  }, [page, rowsPerPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
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
            {data.map((order) => <OrderManagerRow key={order.orderId} order={order} />)}
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
  );
}
