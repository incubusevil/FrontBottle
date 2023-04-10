import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Copyright } from '../components';
import CustoemrManagerPanel from '../components/CustomerManagerPanel';
import AddCustomer from './AddCustomer';

export default function ManagerCustomers() {
  return (
    <Container component="main">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <CustoemrManagerPanel />
          </Paper>
        </Grid>
      </Grid>
      <AddCustomer />
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
