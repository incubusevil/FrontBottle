import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminDashboard from "../../components/admin/AdminDashboard";
import url from "../../components/url";

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
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export const AdminPanel = () => {
  const [mailSender, setMailSender] = React.useState();
  const [driveSave, setDriveSave] = React.useState();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    axios
    .get(
      url + "/rest/api/settings/getMailSender",
      {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setMailSender(response.data);
    });
    axios
    .get(
      url + "/rest/api/settings/getActiveDrive",
      {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setDriveSave(response.data);
    });
  }, []);

  const handleChangeMail = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .post(
        url + "/rest/api/settings/changeMailSender",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {
            mailConfiguration: value
          }
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleChangeSave = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const savedToken = localStorage.getItem("token");
    axios
      .post(
        url + "/rest/api/settings/changeActiveDrive",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {
            driveConfiguration: value
          }
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <>
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
              AdminDashboard
            </Typography>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <div>
                    <Box>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Set Mail Sender:
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={mailSender}
                            name="radio-buttons-group"
                            onChange={handleChangeMail}
                          >
                            <FormControlLabel
                              value="MAILGUN"
                              control={<Radio />}
                              label="Mailgun"
                            />
                            <FormControlLabel
                              value="SENDGRID"
                              control={<Radio />}
                              label="Sendgrid"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Set Drive Save:
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={driveSave}
                            name="radio-buttons-group"
                            onChange={handleChangeSave}
                          >
                            <FormControlLabel
                              value="LOCAL"
                              control={<Radio />}
                              label="Local"
                            />
                            <FormControlLabel
                              value="Drive"
                              control={<Radio />}
                              label="Google Drive"
                            />
                          </RadioGroup>
                        </FormControl>
                      </CardContent>
                    </Box>
                  </div>
                </React.Fragment>
              }
            >
              <IconButton
                color="inherit"
              >
                  <SettingsIcon />
              </IconButton>
            </HtmlTooltip>
            <IconButton color="inherit" onClick={() => {
              navigate("/LoginPage"), handleLogout();
            }}>
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
          <AdminDashboard />
        </Box>
      </Box>
    </>
  );
};