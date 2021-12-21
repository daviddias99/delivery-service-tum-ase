import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectedBoxes } from '../../../redux/slices/box/boxesSlice';

import * as React from 'react';
import AddBox from './AddBox';
import DeleteBox from './DeleteBox';


export const ManageBoxes = () => {
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
            <AddBox />
            {useSelector(selectedBoxes).length > 0 && <DeleteBox />}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );

};


export default ManageBoxes;