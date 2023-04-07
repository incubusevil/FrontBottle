import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link as RouteLink } from "react-router-dom";

export const CustomersOperatorRow = ({ user }) => {

  const [orderId, setOrderId] = React.useState();

  const hanldeCreateOrder = async () => {
    console.log(user);
    const savedToken = localStorage.getItem("token");
    axios
      .get(
        "http://localhost:8080/rest/api/bottles/createOrder",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        setOrderId(response.data.orderId);
      });
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Avatar
          src={user.profilePhotoPath}
          style={{
            margin: "10px",
            width: "60px",
            height: "60px",
          }}
        />
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.company}</TableCell>
      <TableCell>
        <Button
          component={RouteLink}
          onClick={hanldeCreateOrder}
          to="/CreateOrder"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Submit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          component={RouteLink}
          to="/CustomersOrder"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Orders
        </Button>
      </TableCell>
    </TableRow>
  );
};
