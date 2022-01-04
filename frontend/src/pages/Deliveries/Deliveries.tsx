import React, { useEffect } from 'react';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Spinner from 'components/common/Spinner/Spinner';

import Title from 'components/common/Title/Title';
import DeliveriesList from 'components/custom/deliveries/DeliveriesList';
import ManageDeliveries from 'components/custom/delivery/deliveryManagement/Manage';
import Layout from 'components/common/Layout/Layout';

import api from 'services/api';
import { useDispatch } from 'react-redux';
import { updateDeliveries } from 'redux/slices/delivery/deliveriesSlice';
import { AxiosResponse } from 'axios';


const Deliveries = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(
    () => {
      setIsLoading(true);
      const requestCallback = (response: AxiosResponse<any, any>) => {
        dispatch(updateDeliveries(response.data));
        setIsLoading(false);
      };

      api.getAllDeliveries(requestCallback);
    }
    , [dispatch, setIsLoading]);

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        {
          isLoading ?
            <Spinner className="loadingSpinner" /> :
            <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
              <Title>Deliveries</Title>
              <ManageDeliveries />
              <DeliveriesList />
            </Paper>
        }

      </Container>
    </Layout>
  );
};

export default Deliveries;