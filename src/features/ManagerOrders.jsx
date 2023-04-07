import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Copyright } from '../components';
import Container from "@mui/material/Container";
import OrderManagerPanel from '../components/OrderManagerPanel';

export default function Orders() {
    return( 
        <Container component="main">
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <OrderManagerPanel />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
      </Container>
        );
}