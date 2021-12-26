import { Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
      }),
    },
  }),
);

type SidebarProps = {
  open: boolean,
  toggleDrawer: () => void,
};

const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography style={{padding: '0em 1em'}} variant="h5">Menu</Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>

        </div>
      </Toolbar>
      <Divider />
      <List >
        <SidebarMenu />
      </List>
      <Divider />
    </Drawer>);
};

export default Sidebar;
