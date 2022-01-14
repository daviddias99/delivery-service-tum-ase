import React from 'react';
import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import { Container, Paper, TextField, Grid, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  useNavigate,
} from 'react-router-dom';
import api from 'services/api';
import { AxiosResponse } from 'axios';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import { User } from 'types';

const canViewPage = (user: User) => {
  return user.role === 'CUSTOMER';
};

const OrderSearchPage = () => {

  const [trackingCode, setTrackingCode] = React.useState('');
  const [errorText, setErrorText] = React.useState('');

  const user = useSelector(loggedUser);
  const navigate = useNavigate();

  if (!canViewPage(user)) {
    navigate('/');
  }


  const onClick = () => {
    if (!trackingCode || trackingCode === '') {
      return;
    }

    const callback = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        setErrorText('We could not find any delivery associated with the given tracking number.');
        return;
      }
      navigate(`/delivery/${response.data.id}`);
    };


    api.getByTrackingCode(trackingCode, callback);
  };

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Title>Order Search</Title>
          <Typography align="center" >
            Want to know where your package is? No problem, just insert your tracking code into the box bellow.
          </Typography>
          <Grid container sx={{ mt: 3, mx: 4 }} spacing={1}>
            <Grid item xs={11}>
              <TextField helperText={errorText} value={trackingCode} onChange={(event) => setTrackingCode(event.target.value)} sx={{ width: '100%' }} label="Tracking code" id="outlined-basic" variant="outlined" />
            </Grid>

            <Grid item xs={1} display="flex" alignItems="center" >
              <Button onClick={onClick}>Go</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default OrderSearchPage;