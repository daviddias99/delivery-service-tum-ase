import React from 'react';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Title from 'components/common/Title/Title';
import Image from 'assets/images/process.png';


const Homepage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4, p: 4 }}>
      <Paper sx={{ p: '4em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title>Welcome to the ASE Delivery System!</Title>
        <Typography variant="h6">We&apos;re happy you chose us for your delivery needs.</Typography>
        <Typography align="center" >
          Using ASE Delivery is easy, your delivery service professionals will deliver your package to one of our Boxes, where it will be waiting for you!
        </Typography>
        <img style={{ height: '85px', marginTop: '2em' }} src={Image} />
      </Paper>
    </Container>
  );
};

export default Homepage;