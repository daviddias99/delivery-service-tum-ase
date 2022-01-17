import React from 'react';
import {Avatar, Box, Button, IconButton, Link, Menu, MenuItem, Tooltip} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from 'components/common/Layout/Logout/LogoutButton';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import { useSelector } from 'react-redux';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector(loggedUser);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link href={'/user/profile'} underline="none">
            <Button startIcon={<AccountCircleIcon />}>
              { user.firstName.substring(0, 1) +user.firstName.substring(1).toLowerCase() + ' ' + user.surname}
            </Button>
          </Link>

        </MenuItem>
        <MenuItem>
          <LogoutButton />
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
};
export default ProfileMenu;


