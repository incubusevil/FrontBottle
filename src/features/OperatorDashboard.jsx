import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Copyright } from '../components';
import Container from "@mui/material/Container";
import CustomersOperatorPanel from '../components/OperatorPanelOrders';

export default function OperatorDashboard() {
    return( 
 <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
   <Grid container spacing={3}>     

     <Grid item xs={12}>
       <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
         <CustomersOperatorPanel />
       </Paper>
     </Grid>
   </Grid>
   <Copyright sx={{ pt: 4 }} />
 </Container>
    );
  }