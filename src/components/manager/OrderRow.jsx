import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Header, OrderId, ProfileId } from "../../StackContext";
import { useNavigate } from "react-router-dom";

export const OrderRow = ({ order }) => {
  const { orderId, setOrderId } = React.useContext(OrderId);
  const { header, setHeader } = React.useContext(Header);
  let navigate = useNavigate();

  const hanldeViewOrder = async () => {
    setOrderId(order.orderId);
  };

  const handleSetHeader = (value) => {
    console.log(value);
    setHeader(value);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.company}</TableCell>
      <TableCell>{order.createdDate}</TableCell>
      <TableCell>{order.address}</TableCell>
      <TableCell>{order.status}</TableCell>
      <Button
        onClick={() => {
          navigate("/ManagerPanel/CurrentOrder"),
            hanldeViewOrder(),
            handleSetHeader("Current Order");
        }}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
      >
        View Details
      </Button>
    </TableRow>
  );
};
