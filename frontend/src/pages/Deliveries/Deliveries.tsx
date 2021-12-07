import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';

import api from 'services/api';


const Deliveries = () => {

  useEffect(
    () => {
      api.login({ username: 'user' }, (a) => console.log(a));
    }
  );

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Title>Deliveries</Title>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Deliveries;