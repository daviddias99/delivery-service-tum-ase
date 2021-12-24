import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import Orders from 'components/custom/customer/Orders/Orders';
import { useDispatch } from 'react-redux';
import {
  useParams
} from 'react-router-dom';
import api from 'services/api';
import { updateUser, updateUserDeliveries } from 'redux/slices/user/userSlice';
import Spinner from 'components/common/Spinner/Spinner';

const OrdersPage = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { customerId } = useParams();

  React.useEffect(
    () => {
      if (!isLoading) {
        return;
      }

      setIsLoading(true);
      const useRequestCallback = (userData: any, status: number) => {
        if (status !== 200) {
          return;
        }

        dispatch(updateUser(userData));
        const userDeliveriesRequestCallback = (deliveryData: any, status: number) => {
          if (status !== 200) {
            return;
          }
          console.log(deliveryData);
          dispatch(updateUserDeliveries(deliveryData));
          setIsLoading(false);
        };
        api.getCustomerDeliveries(userData.id!, userDeliveriesRequestCallback);
      };
      api.getCustomer(customerId!, useRequestCallback);
    }
    , [dispatch, customerId, setIsLoading, isLoading]);

  return (
    <Layout hasSidebar={true}>
      {isLoading ?
        <Spinner className="loadingSpinner" /> :
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
            <Title>Orders Overview</Title>
            <Orders />
          </Paper>
        </Container>}
    </Layout>
  );
};

export default OrdersPage;