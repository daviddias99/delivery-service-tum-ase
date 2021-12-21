import React from 'react';
import { Paper, TextField, Grid, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Title from 'components/common/Title/Title';
import { useNavigate } from 'react-router-dom';
import api from 'services/api';

const Homepage = () => {

  const [trackingCode, setTrackingCode] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const navigate = useNavigate();

  const onClick = () => {
    if (!trackingCode || trackingCode === '') {
      return;
    }

    const callback = (data: any, status: number) => {
      if (status !== 200) {
        setErrorText('We could not find any delivery associated with the given tracking number.');
        return;
      }
      navigate(`/delivery/${data.id}`);
    };


    api.getByTrackingCode(trackingCode, callback);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4, p: 4 }}>
      <Paper sx={{ p: '6em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title>Welcome to the ASE Delivery System!</Title>
        <Typography variant="h6">We&apos;re happy you chose us for your delivery needs.</Typography>
        <Typography align="center" >
          Want to know where your package is? No problem, just insert your tracking code into the box bellow, or alternatively
          {' '}
          <span>
            <a href="/box">login.</a>
          </span>
        </Typography>
        <Grid container sx={{mt: 3}} spacing={1}>
          <Grid item xs={11}>
            <TextField helperText={errorText} value={trackingCode} onChange={(event) => setTrackingCode(event.target.value)} sx={{ width: '100%' }} label="Tracking code" id="outlined-basic" variant="outlined" />
          </Grid>

          <Grid item xs={1} display="flex" alignItems="center" >
            <Button onClick={onClick}>Go</Button>
          </Grid>
        </Grid>

      </Paper>
    </Container>
  );

};

export default Homepage;