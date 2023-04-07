import * as React from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import { CustomersOperatorRow } from "./CustomersOperatorRow";

const columns = [
  { id: "email", label: "Email", minWidth: 120 },
  { id: "firstName", label: "First Name", minWidth: 120 },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 120,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 120,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "company",
    label: "Company Name",
    minWidth: 100,
  },
];

export default function CurrentOrder() {
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
    const savedToken = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/rest/api/user/getCustomersList", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: { size: rowsPerPage, page: page + 1 },
      })
      .then((response) => {
        setData(response.data.content);
        setCount(response.data);
      });
  }, [page, rowsPerPage]);



  //todo add active orders near exit button

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
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
                <TableCell>Create Order</TableCell>
                <TableCell>Customer Orders</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((user) => <CustomersOperatorRow key={user.email} user={user}/>)}
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
  );
}
