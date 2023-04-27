import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link as RouteLink } from "react-router-dom";

export const CustomersOrderRow = ({ order }) => {

  const hanldeViewOrder = async () => {
    localStorage.setItem('orderId', order.orderId);
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.createdDate}</TableCell>
      <TableCell>{order.deliveryAddress}</TableCell>
      <TableCell>{order.status}</TableCell>
      <TableCell>
        <Button
          component={RouteLink}
          to="/CurrentOrder"
          onClick={hanldeViewOrder}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          View Order
        </Button>
      </TableCell>
    </TableRow>
  );
};
