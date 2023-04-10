import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Dialog from '@mui/material/Dialog';

function CreateCustomer() {
  const rolename = 'CUSTOMER';
  const roles = [
    { rolename },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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

    const savedToken = localStorage.getItem('token');

    console.log(roles);

    axios
      .post('http://localhost:8080/rest/api/user/createUser', {
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

  return (
    <Box
      sx={{
        marginLeft: 40,
        marginRight: 40,
      }}
    >
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickOpen}
      >
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ height: 1000, mt: 4 }}>
        <Paper>
          <Grid xs={6}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Customer
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleClose}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Customer
                  </Button>

                </Box>
              </Box>
            </Container>
          </Grid>
        </Paper>
      </Dialog>
    </Box>
  );
}

export default function AddCustomer() {
  return <CreateCustomer />;
}
