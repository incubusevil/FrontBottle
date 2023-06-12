import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Outlet } from "react-router-dom";
import {
  Header,
} from "../../StackContext";


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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));


export const ManagerPanel = ()=> {

  const { header, setHeader } = React.useContext(Header);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleSetHeader = (value) => {
    console.log(value);
    setHeader(value);
  };

  React.useEffect(() => {
    navigate("/ManagerPanel/ManagerDashboard");
    handleSetHeader("Manager Dashboard");
  }, []);

  return(
    <>
      <Box sx={{ display: 'flex' }}>
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
              {header}
            </Typography>
            <HtmlTooltip title="Manager Dashboard">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/ManagerPanel/ManagerDashboard"),
                  handleSetHeader("Manager Dashboard");
              }}
            >
              <HomeIcon />
            </IconButton>
          </HtmlTooltip>
          <HtmlTooltip title="Orders">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/ManagerPanel/Orders"),
                  handleSetHeader("Orders");
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </HtmlTooltip>
          <HtmlTooltip title="Customers">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/ManagerPanel/Customers"),
                  handleSetHeader("Customers");
              }}
            >
              <PeopleIcon />
            </IconButton>
          </HtmlTooltip>
          <HtmlTooltip title="Log Out">
          <IconButton color="inherit" onClick={() => {
                navigate("/LoginPage"), handleLogout();
              }}>
              <LogoutIcon />
            </IconButton>
          </HtmlTooltip>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      </>
  );
}