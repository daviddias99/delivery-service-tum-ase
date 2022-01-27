import React, {useState} from 'react';

import Container from '@mui/material/Container';
import {
  Alert,
  Avatar,
  Box,
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton
} from '@mui/material';
import {User} from '../../../../types';
import {useSelector} from 'react-redux';
import {loggedUser} from '../../../../redux/slices/loggedUser/loggedUserSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../../services/api';
import {useNavigate} from 'react-router-dom';



const UserProfile = (props:any) => {
  const [open, setOpen] = useState(false);
  const user:User = props.user;
  const navigate = useNavigate();
  const signedInUser:User = useSelector(loggedUser);
  const handleOpen=() => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteClicked = () => {
    api.deleteUser(user.id, () => {});
    handleClose();
    navigate('/dispatcher/usersList/');
  };
  // @ts-ignore
  return (

    <Container maxWidth="xl">

      <Box sx={{ bgcolor: '#152238', height: '10vh', position: 'relative'}}>
        <Avatar sx={{ border: '5px solid', borderRadius: '50%', color: '#000000', bgcolor: '#FFFFFF', width: '120px', height: '120px', marginLeft: 'auto', marginRight: 'auto', fontSize: '40px'}}>
          {user.firstName.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      {user.id !== signedInUser.id?
        <div>
          <IconButton aria-label="delete" size="large" sx={{float: 'right'}} onClick={handleOpen}>
            <DeleteIcon color="error" fontSize="large" />
          </IconButton>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete User</DialogTitle>
            <React.Fragment>
              <DialogContent>
                <Alert severity="warning">Are you sure!</Alert>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                  deleteClicked();
                }}
                >
                  Delete
                </Button>
              </DialogActions>
            </React.Fragment>
          </Dialog>
        </div>
        : <> </>}
      <Box sx={{marginTop: '45px'}}>
        <div style={{textAlign: 'center', fontSize: '30px'}} >
          {user.firstName}
          {' ' + user.surname}
        </div>
        <div style={{textAlign: 'center', fontSize: '20px', color: 'grey'}}>
          {user.role.substr(0, 1)+user.role.substr(1).toLocaleLowerCase()}
        </div>
        <div id="personalInfos" style={{marginTop: '3%', marginBottom: '5%', textAlign: 'center'}}>
          <Divider />
          <h3 style={{fontSize: '20px'}}>
            Personal Information:
          </h3>
          <p style={{marginTop: '10px'}} >
            <b className="infoTag" >Id: </b>
            {' '}
            {user.id}
          </p>
          <p style={{marginTop: '10px'}}>
            <b className="infoTag">First Name: </b>
            {' '}
            {user.firstName}
          </p>
          <p style={{marginTop: '10px'}}>
            <b className="infoTag">Surname: </b>
            {' '}
            {user.surname}
          </p>
          <p style={{marginTop: '10px'}}>
            <b className="infoTag">Email: </b>
            {' '}
            {user.email}
          </p>
          <p style={{marginTop: '10px'}}>
            <b className="infoTag">Role: </b>
            {' '}
            {user.role}
          </p>
        </div>
        <Divider />
      </Box>

    </Container>

  );
};
export default UserProfile;