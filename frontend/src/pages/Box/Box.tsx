import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import Spinner from 'components/common/Spinner/Spinner';
import Box from 'components/custom/box/Box/Box';
import { useDispatch } from 'react-redux';
import {
  useParams
} from 'react-router-dom';
import api from 'services/api';
import { updateBox, updateBoxDeliveries } from 'redux/slices/box/boxSlice';

const BoxPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { boxId } = useParams();

  useEffect(
    () => {
      setIsLoading(true);
      const boxRequestCallback = (data: any, status: number) => {
        if (status !== 200) {
          return;
        }

        dispatch(updateBox(data));
        const boxDeliveriesRequestCallback = (data: any) => {
          if (status !== 200) {
            return;
          }
          setIsLoading(false);
          dispatch(updateBoxDeliveries(data));
        };
        api.getBoxDeliveries(data.id!, boxDeliveriesRequestCallback);
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