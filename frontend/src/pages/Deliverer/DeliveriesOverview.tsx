import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import Deliveries from 'components/custom/deliverer/Deliverer/Deliveries';
import { useDispatch } from 'react-redux';
import {
  useParams
} from 'react-router-dom';
import api from 'services/api';
import { updateUser, updateUserDeliveries } from 'redux/slices/user/userSlice';
import Spinner from 'components/common/Spinner/Spinner';
import { AxiosResponse } from 'axios';

const DeliveriesOverview = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { delivererId } = useParams();

  React.useEffect(
    () => {
      if (!isLoading) {
        return;
      }

      setIsLoading(true);
      const useRequestCallback = (response: AxiosResponse<any, any>) => {
        if (response.status !== 200) {
          return;
        }

        dispatch(updateUser(response.data));
        const userDeliveriesRequestCallback = (responseDeliveries: AxiosResponse<any, any>) => {
          if (responseDeliveries.status !== 200) {
            return;
          }
          dispatch(updateUserDeliveries(responseDeliveries.data));
          setIsLoading(false);
        };
        api.getDelivererDeliveries(response.data.id!, userDeliveriesRequestCallback);
      };
      api.getDeliverer(delivererId!, useRequestCallback);
    }
    , [dispatch, delivererId, setIsLoading, isLoading]);

  return (
    <Layout hasSidebar={true}>
      {isLoading ?
        <Spinner className="loadingSpinner" /> :
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
            <Title>Deliveries Overview</Title>
            <Deliveries />
          </Paper>
        </Container>}
    </Layout>
  );
};

export default DeliveriesOverview;