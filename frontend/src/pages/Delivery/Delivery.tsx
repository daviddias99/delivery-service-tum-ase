import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import Delivery from 'components/delivery/Delivery/Delivery';

import api from 'services/api';
import { useDispatch } from 'react-redux';
import { updateDelivery } from 'redux/slices/delivery/deliverySlice';
import { updateBox } from 'redux/slices/box/boxSlice';
import {
  useParams
} from 'react-router-dom';

const DeliveryPage = () => {
  const dispatch = useDispatch();
  const { deliveryId } = useParams();
  useEffect(
    () => {
      const deliveryRequestCallback = (data: any, status: number) => {
        if (status !== 200) {
          return;
        }

        dispatch(updateDelivery(data));
        const boxRequestCallback = (data: any) => {
          if (status !== 200) {
            return;
          }

          dispatch(updateBox(data));
        };
        api.getBox(data.box.id!, boxRequestCallback);
      };

      api.getDelivery(deliveryId!, deliveryRequestCallback);
    }
    , [dispatch, deliveryId]);

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