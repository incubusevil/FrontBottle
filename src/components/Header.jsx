import * as React from "react";
import Button from "@mui/material/Button";
import { Link as RouteLink } from "react-router-dom";

export const Header = ({ header }) => {

  const hanldeViewOrder = async () => {
    localStorage.setItem('orderId', order.orderId);
  }

  return (
    <React.Component>
      <Button
        component={RouteLink}
        to="/CustomersOperatorPanel"
        onClick={hanldeViewOrder}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
      >
        {header.opPane}
      </Button>
      <Button
        component={RouteLink}
        to="/CustomersOrder"
        onClick={hanldeViewOrder}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
      >
        {header.cuOrde}
      </Button>
      <Button
        component={RouteLink}
        to="/CurrentOrder"
        onClick={hanldeViewOrder}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
      >
        {header.orDeta}
      </Button>
      <Button
        component={RouteLink}
        to="/CreateOrder"
        onClick={hanldeViewOrder}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
      >
        {header.store}
      </Button>
    </React.Component>
  );
};
