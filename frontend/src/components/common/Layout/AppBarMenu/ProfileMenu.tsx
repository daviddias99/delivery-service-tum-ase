import React from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
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
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
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
          <Link to={'/customer/61bf5a99b2f2079579480d38/orders'}>
            <ShoppingCartOutlinedIcon />
            {' '}
            My Orders
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/deliverer/1/deliveries'}>
            <ShoppingCartOutlinedIcon />
            {' '}
            My Deliveries
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
export default ProfileMenu;


