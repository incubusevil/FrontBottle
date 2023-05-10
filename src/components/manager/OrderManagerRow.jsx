import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import url from "../url";

export const OrderManagerRow = ({ order }) => {
  const [status, setStatus] = React.useState(order.status);

  const handleSubmit = async () => {
    const email = order.email;
    console.log(email, status);
    const savedToken = localStorage.getItem('token');
    axios.get(url+"/rest/api/user/setNewOrderStatus", {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
      params: { email, status },
    });
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.email}</TableCell>
      <TableCell>{order.deliveryAddress}</TableCell>
      <TableCell>{order.createdDate}</TableCell>
      <TableCell>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Approved by customer">Approved by customer</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 1, mb: 1 }}
      >
        Submit
      </Button>
    </TableCell>
    </TableRow>
  );
};
