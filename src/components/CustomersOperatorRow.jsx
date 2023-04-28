import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link as RouteLink } from "react-router-dom";
import url from "./url";

export const CustomersOperatorRow = ({ user, setNumberOfPosition}) => {

  const handleProfileOrders = async () => {
    localStorage.setItem('profileId', user.profileId);
  }

  const hanldeCreateOrder = async () => {
    const savedToken = localStorage.getItem("token");
    const createStatus = "Created";
    axios
      .post(
        url+"/rest/api/customer/order/createOrder",
        {
          profileId: user.profileId,
          address: user.address,
          status: createStatus,
          operatorId
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem('orderId', response.data);
        setNumberOfPosition(0);
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
          Create
        </Button>
      </TableCell>
      <TableCell>
        <Button
          component={RouteLink}
          to="/CustomersOrder"
          onClick={handleProfileOrders}
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
