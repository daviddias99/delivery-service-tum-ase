import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/slices/loggedUser/loggedUserSlice';
import { useNavigate } from 'react-router-dom';
import api from 'services/api';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    const callback = () => {
      dispatch(logout());
      navigate('/');
    };

    api.logout(callback);
  };

  return (
    <Button onClick={handleClick}>
      <LogoutIcon style={{ marginRight: '0.2em' }} />
      {' '}
      Logout
    </Button>);
};

export default LogoutButton;