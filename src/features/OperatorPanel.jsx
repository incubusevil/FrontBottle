import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouteLink, Route, Routes } from "react-router-dom";
import CreateOrder from "../components/CreateOrder";
import CustomersOrder from "../components/CustomersOrder";
import CurrentOrder from "../components/CurrentOrder";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import ShopIcon from "@mui/icons-material/Shop";
import Tooltip , { tooltipClasses }from '@mui/material/Tooltip';
import CardContent from '@mui/material/CardContent';
import OperatorPanelOrders from "../components/OperatorPanelOrders";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


export const OperatorPanel = ({ handleLogout, user }) => {
  const [numberOfPosition, setNumberOfPosition] = React.useState(0);
  const [data, setData] = React.useState(0);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={false}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Operator Dashboard
          </Typography>
          <IconButton color="inherit" component={RouteLink} to="/CreateOrder">
            <ShopIcon />
          </IconButton>

            <HtmlTooltip title={
          <React.Fragment>
              <div>
                <Box>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                       Order ID : {data.orderId}
                      </Typography>
                      <Typography variant="h5" component="div">
                       Customer : {data.company}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                       Number of Position : {numberOfPosition}
                      </Typography>
                      <Typography variant="body2">
                       Order Created Date : {data.createdDate}
                      </Typography>
                    </CardContent>
                    </Box>
                    </div>
          </React.Fragment>
        }>
                <IconButton
                  color="inherit"
                  component={RouteLink}
                  to="/CurrentOrder"
                >
                  <Badge badgeContent={numberOfPosition} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                </HtmlTooltip>
          <IconButton
            color="inherit"
            component={RouteLink}
            to="/CustomersOperatorPanel"
          >
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Routes>
          <Route
            path="/CustomersOperatorPanel"
            element={
              <OperatorPanelOrders
                setNumberOfPosition={setNumberOfPosition}
                user={user}
              />
            }
          />
          <Route
            path="/CreateOrder"
            element={<CreateOrder setNumberOfPosition={setNumberOfPosition} user={user} transferData={data} setTransferData={setData}/>}
          />
          <Route
            path="/CustomersOrder"
            element={
              <CustomersOrder setNumberOfPosition={setNumberOfPosition} />
            }
          />s
          <Route
            path="/CurrentOrder"
            element={
              <CurrentOrder
                setNumberOfPosition={setNumberOfPosition}
                data={data}
                setData={setData}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};
