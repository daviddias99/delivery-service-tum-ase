import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import Spinner from 'components/common/Spinner/Spinner';
import Box from 'components/custom/box/Box/Box';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import api from 'services/api';
import { updateBox, updateBoxDeliveries } from 'redux/slices/box/boxSlice';
import { AxiosResponse } from 'axios';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import { User } from 'types';

const canViewPage = (user: User) => {
  return user.role === 'DISPATCHER';
};

const BoxPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { boxId } = useParams();
  const user = useSelector(loggedUser);
  const navigate = useNavigate();

  if (!canViewPage(user)) {
    navigate('/');
  }


  useEffect(
    () => {
      setIsLoading(true);
      const boxRequestCallback = (response: AxiosResponse<any, any>) => {
        if (response.status !== 200) {
          return;
        }

        dispatch(updateBox(response.data));
        const boxDeliveriesRequestCallback = (responseDeliveries: AxiosResponse<any, any>) => {
          if (responseDeliveries.status !== 200) {
            return;
          }
          dispatch(updateBoxDeliveries(responseDeliveries.data));
          setIsLoading(false);
        };
        api.getBoxDeliveries(response.data.id!, boxDeliveriesRequestCallback);
      };
      api.getBox(boxId!, boxRequestCallback);
    }
    , [dispatch, boxId]);


  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          {isLoading ? <Spinner className="loadingSpinner" /> : <Box />}
        </Paper>
      </Container>
    </Layout>
  );
};

export default BoxPage;