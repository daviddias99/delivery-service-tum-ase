import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import * as React from 'react';
import AddDelivery from './AddDelivery';


export const ManageDeliveries = () => {
  return (
    <div style={{ whiteSpace: 'nowrap' }} >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <AddDelivery />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};


export default ManageDeliveries;