import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CustomersAdminPanel from '../components/UsersAdminPanel';
import { Copyright } from '../components';

export default function CustomerOrders() {
  return (
    <Container component="main">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <CustomersAdminPanel />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
