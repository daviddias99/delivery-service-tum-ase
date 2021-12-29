import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Spinner from 'components/common/Spinner/Spinner';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import Delivery from 'components/custom/delivery/Delivery/Delivery';

import api from 'services/api';
import { useDispatch } from 'react-redux';
import { updateDelivery } from 'redux/slices/delivery/deliverySlice';
import { updateBox } from 'redux/slices/box/boxSlice';
import {
  useParams
} from 'react-router-dom';
import { AxiosResponse } from 'axios';

const DeliveryPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { deliveryId } = useParams();
  useEffect(
    () => {
      setIsLoading(true);
      const deliveryRequestCallback = (response: AxiosResponse<any, any>) => {
        if (response.status !== 200) {
          return;
        }

        dispatch(updateDelivery(response.data));
        const boxRequestCallback = (responseBox: AxiosResponse<any, any>) => {
          if (responseBox.status !== 200) {
            return;
          }
          dispatch(updateBox(responseBox.data));
          setIsLoading(false);
        };
        api.getBox(response.data.box.id!, boxRequestCallback);
      };

      api.getDelivery(deliveryId!, deliveryRequestCallback);
    }
    , [dispatch, deliveryId]);

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          {isLoading ? <Spinner className="loadingSpinner" /> : <Delivery />}
        </Paper>
      </Container>
    </Layout>
  );
};

export default DeliveryPage;