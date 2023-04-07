import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";

export function EditUser({ user: userData }) {
  const rolename = "CUSTOMER";
  const roles = [{ rolename }];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log(userData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    console.log(event);

    event.preventDefault();

    const firstName = event.target?.[0].value;
    const lastName = event.target?.[2].value;
    const email = event.target?.[4].value;
    const address = event.target?.[6].value;
    const phoneNumber = event.target?.[8].value;
    const company = event.target?.[10].value;
    const password = event.target?.[12].value;

    const savedToken = localStorage.getItem("token");
    console.log(roles);
    axios
      .post("http://localhost:8080/rest/api/user/UpdateUser", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        company,
        password,
        roles,
      })
      .then((response) => console.log(response.data));
  };

  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    userData.profilePhotoPath
  );
  
  const [changes, setChanges] = useState(true
  );

  const handleChange = async (event) => {
    event.preventDefault();
    setChanges(false)
  }


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
      <Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClickOpen}
        >
          Edit User
        </Button>
        <Dialog open={open} onClose={handleClose} sx={{ height: 750, mt: 15 }}>
          <Paper>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
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
                  Edit User
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
                        defaultValue={userData.firstName}
                        onChange={handleChange}
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
                        defaultValue={userData.lastName}
                        onChange={handleChange}
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
                        defaultValue={userData.email}
                        onChange={handleChange}
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
                        defaultValue={userData.address}
                        onChange={handleChange}
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
                        defaultValue={userData.phoneNumber}
                        onChange={handleChange}
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
                        defaultValue={userData.company}
                        onChange={handleChange}
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
                        defaultValue={userData.password}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled = {changes}
                    
                  >
                    Apply Changes
                  </Button>
                </Box>
              </Box>
            </Container>
          </Paper>
        </Dialog>
      </Box>
    </>
  );
}
