import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import BoxesList from 'components/custom/boxes/BoxesList/BoxesList';

import { ManageBoxes } from 'components/custom/boxes/boxManagement/Manage';

import api from 'services/api';
import { useDispatch } from 'react-redux';
import { updateBoxes } from 'redux/slices/box/boxesSlice';
import { AxiosResponse } from 'axios';

const Boxes = () => {

  const dispatch = useDispatch();

  useEffect(
    () => {
      const requestCallback = (response: AxiosResponse<any, any>) => {
        dispatch(updateBoxes(response.data));
      };

      api.getAllBoxes(requestCallback);
    }
    , [dispatch]);

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Title>Boxes</Title>
          <ManageBoxes />
          <BoxesList />
        </Paper>
      </Container>
    </Layout>
  );
};

export default Boxes;