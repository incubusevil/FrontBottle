import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouteLink, Route, Routes } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManagerDashboard from './ManagerDashboard';
import Orders from './ManagerOrders';
import ManagerCustomers from './ManagerCustomers';
import CurentMonthSales from './CurentMonthSales';
import LastQuarterSales from './LastQuarterSales';
import YearEndSales from './YearEndSales';
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export function ManagerPanel() {
  const [context, setContext] = useContext(Context);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setContext({ ...context, user: null });
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open>
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
            Manager Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        />
        <Divider />
        <List component="nav">
          <ListItemButton component={RouteLink} to="/ManagerDashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={RouteLink} to="/Orders">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          <ListItemButton component={RouteLink} to="/Customers">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            Sales
          </ListSubheader>
          <ListItemButton component={RouteLink} to="/CurentMonthSales">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
          </ListItemButton>
          <ListItemButton component={RouteLink} to="/LastQuarterSales">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
          </ListItemButton>
          <ListItemButton component={RouteLink} to="/YearEndSales">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
          </ListItemButton>
        </List>
      </Drawer>
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Customers" element={<ManagerCustomers />} />
            <Route path="/CurentMonthSales" element={<CurentMonthSales />} />
            <Route path="/LastQuarterSales" element={<LastQuarterSales />} />
            <Route path="/YearEndSales" element={<YearEndSales />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
