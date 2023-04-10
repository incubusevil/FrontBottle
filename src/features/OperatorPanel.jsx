import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouteLink, Route, Routes } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';
import CreateOrder from '../components/CreateOrder';
import CustomersOrder from '../components/CustomersOrder';
import CurrentOrder from '../components/CurrentOrder';
import CustomersOperatorPanel from '../components/CustomersOperatorPanel';
import { Context } from '../app/providers';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function OperatorPanel() {
  const [context, setContext] = useContext(Context);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setContext({ ...context, user: null });
  };
  const [items, setItems] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={false}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
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
          <IconButton
            color="inherit"
            component={RouteLink}
            to="/CurrentOrder"
          >
            <Badge badgeContent={itemsInCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
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
          backgroundColor: (theme) => (theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900]),
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Routes>
          <Route
            path="/CustomersOperatorPanel"
            element={<CustomersOperatorPanel />}
          />
          <Route
            path="/CreateOrder"
            element={<CreateOrder setItems={setItems} />}
          />
          <Route path="/CustomersOrder" element={<CustomersOrder />} />
          <Route path="/CurrentOrder" element={<CurrentOrder />} />
        </Routes>
      </Box>
    </Box>
  );
}
