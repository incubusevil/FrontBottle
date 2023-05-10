import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import url from "../url";

export default function AddUser() {
  return <CreateUser />;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "USER",
  "MANAGER",
  "SUPERVISOR",
  "STOREMAN",
  "SHIPPER",
  "ADMIN",
  "OPERATOR",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CreateUser() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    "http://localhost:8080/photos/test.png"
  );

  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target?.[0].value;
    const lastName = event.target?.[2].value;
    const email = event.target?.[4].value;
    const address = event.target?.[6].value;
    const phoneNumber = event.target?.[8].value;
    const company = event.target?.[10].value;
    const password = event.target?.[12].value;
    const savedToken = localStorage.getItem("token");
    axios
      .post(
        url+"/rest/api/user/createUser",
        {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          company,
          password,
          roles: personName.map((e) => ({ roleName: e })),
          profilePhoto: profilePhotoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      )
      .then((response) => console.log(response.data));
  };

  const handleFileSelect = async (event) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const savedToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/rest/api/user/photos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      setProfilePhotoUrl(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        m="auto"
        sx={{
          width: 300,
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClickOpen}
        >
          Add user
        </Button>
        <Dialog open={open} onClose={handleClose} sx={{ height: 750, mt: 15 }}>
          <Paper>
            <Grid xs={6}>
              <CssBaseline />
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton variant="contained" component="label">
                    <Avatar
                      src={profilePhotoUrl}
                      style={{
                        margin: "10px",
                        width: "60px",
                        height: "60px",
                      }}
                    />
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleFileSelect}
                    />
                  </IconButton>

                  <Typography component="h1" variant="h5">
                    Add User
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
                          autoComplete="address"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="phoneNumber"
                          label="Phone Number"
                          name="phoneNumber"
                          autoComplete="phoneNumber"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="company"
                          label="Company Name"
                          name="cpmpany"
                          autoComplete="company"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: 300 }} component="form">
                          <InputLabel id="demo-multiple-chip-label">
                            Roles
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Roles"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {names.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleClose}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Paper>
        </Dialog>
      </Box>
    </>
  );
}
