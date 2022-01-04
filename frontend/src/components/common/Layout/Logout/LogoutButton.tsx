import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/slices/loggedUser/loggedUserSlice';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    // TODO logout API call
    dispatch(logout());
    navigate('/');
  };

  return (
    <Button onClick={handleClick}>
      <LogoutIcon style={{ marginRight: '0.2em' }} />
      {' '}
      Logout
    </Button>);
};

export default LogoutButton;