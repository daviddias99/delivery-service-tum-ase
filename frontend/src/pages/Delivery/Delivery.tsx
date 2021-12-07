import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import Delivery from 'components/delivery/Delivery/Delivery';

const DeliveryPage = () => {
  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Delivery />
        </Paper>
      </Container>
    </Layout>
  );
};

export default DeliveryPage;