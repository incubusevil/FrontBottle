import React, { useContext } from 'react';
import {
  Avatar, Box, Typography, Grid, Paper,
} from '@mui/material';
import axios from 'axios';
import decode from 'jwt-decode';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoginForm, Copyright } from '../components';
import { Context } from '../app/providers';

export function LoginPage() {
  const [context, setContext] = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target?.[0].value;
    const password = event.target?.[2].value;
    axios.post('http://localhost:8080/rest/api/auth/login', { email, password })
      .then((response) => {
        setContext({ ...context, user: decode(response.data) });
        localStorage.setItem('token', response.data);
      });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light'
            ? t.palette.grey[50]
            : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm handleSubmit={handleSubmit} />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Grid>
    </Grid>
  );
}
