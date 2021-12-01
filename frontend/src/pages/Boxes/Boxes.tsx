import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import BoxesList from 'components/boxes/BoxesList/BoxesList';

import api from 'services/api';
import { ManageBoxes } from 'components/boxes/boxManagement/Manage';


const Boxes = () => {

  useEffect(
    () => {
      api.login({ username: 'user' }, (a) => console.log(a));
    }
  );

  return (
    <Layout>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <ManageBoxes />
          <Title>Boxes</Title>
          <BoxesList />
        </Paper>
      </Container>
    </Layout>
  );
};

export default Boxes;