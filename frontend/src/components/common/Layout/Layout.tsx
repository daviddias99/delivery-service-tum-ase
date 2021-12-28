import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar/Sidebar';

import { Button } from '@mui/material';
import LoginModal from './LoginModal/LoginModal';
import AppLogo from 'components/common/Layout/AppLogo/AppLogo'; // Import using relative path
import Image from 'assets/images/bg-blured_small.jpg'; // Import using relative path
import ProfileMenu from 'components/common/Layout/AppBarMenu/ProfileMenu';
import { isLoggedIn } from 'redux/slices/loggedUser/loggedUserSlice';
import { useSelector } from 'react-redux';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps & { hassidebar: boolean }>(({ theme, open, hassidebar }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  },
  ),
  backgroundColor: 'primary',
  ...(open && hassidebar && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type LayoutProps = {
  hasSidebar: boolean
  children: React.ReactNode
}

const Layout = ({ hasSidebar, children }: LayoutProps) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const loggedIn = useSelector(isLoggedIn);
  const [open, setOpen] = useState(hasSidebar);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} hassidebar={hasSidebar}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          {hasSidebar &&
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>}
          <AppLogo />

          {
            loggedIn &&
            <ProfileMenu />
          }
          {
            !loggedIn &&
            <React.Fragment>
              <Button sx={{ borderColor: 'white', color: 'white' }} variant="outlined" onClick={() => setLoginModalOpen(true)}>Login</Button>
              <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
            </React.Fragment>
          }

        </Toolbar>
      </AppBar>
      {hasSidebar && <Sidebar open={open} toggleDrawer={toggleDrawer} />}
      <Box
        component="main"
        sx={{
          ...(hasSidebar && {
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
          }),
          ...(!hasSidebar && {
            backgroundImage: `url(${Image})`,
            backgroundSize: '100% auto',
            minHeight: '100%',
          }),
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box >
  );
};

export default Layout;