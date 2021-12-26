import React from 'react';
import { IconButton, Typography } from '@mui/material';
import Image from 'assets/icons/package-cube-box-for-delivery-svgrepo-com.svg';

const AppLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <a className="applogo" href="/">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <img style={{ height: '40px' }} src={Image} />
        </IconButton>
      </a>

      <Typography
        component="h1"
        variant="h6"
        color="white"
        noWrap
      >
        ASE Delivery
      </Typography>
    </div>
  );
};

export default AppLogo;