import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import Box from 'components/box/Box/Box';

import api from 'services/api';
import { useSelector } from 'react-redux';
import { boxDeliveries, boxInfo } from 'redux/slices/box/boxSlice';




const BoxPage = () => {
  const box = useSelector(boxInfo);
  const deliveries = useSelector(boxDeliveries);
  useEffect(
    () => {
      api.login({ username: 'user' }, (a) => console.log(a));
    }
  );

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Box box={box} deliveries={deliveries} />
        </Paper>
      </Container>
    </Layout>
  );
};

export default BoxPage;