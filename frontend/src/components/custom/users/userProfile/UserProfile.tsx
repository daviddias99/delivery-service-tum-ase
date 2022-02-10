import React, {useState} from 'react';

import Container from '@mui/material/Container';
import {
  Alert,
  Avatar,
  Box,
  Button, Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
  Divider, Grid,
  IconButton, TextField
} from '@mui/material';
import {User} from '../../../../types';
import {useSelector} from 'react-redux';
import {loggedUser} from '../../../../redux/slices/loggedUser/loggedUserSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../../services/api';
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';



const UserProfile = (props:any) => {
  const [open, setOpen] = useState(false);
  const userInfo:User = props.user;
  const navigate = useNavigate();
  const [user, setUser] = useState(userInfo);
  const signedInUser:User = useSelector(loggedUser);
  const [firstName, setFirstName] = useState(user.firstName);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditClicked = () => {
    const updateUserCallback = ( response: any) => {
      if (response.status === 200) {
        handleEditClose();
        const updatedUser: User = {id: user.id, firstName: firstName, surname: surname, role: user.role, email: email};
        setUser(updatedUser);
      }

    };
    const updatedUser: User = {id: user.id, firstName: firstName, surname: surname, role: user.role, email: email};
    api.updateUser(user.id, updatedUser, updateUserCallback);

  };


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
      <IconButton aria-label="delete" size="large" sx={{float: 'right'}} onClick={handleEditOpen}>
        <EditIcon fontSize="large" />
      </IconButton>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the following Cells.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="name"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName( e.target.value )}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="surname"
                label=" Address"
                type="adress"
                fullWidth
                value={surname}
                onChange={(e) => setSurname( e.target.value )}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label=" Email"
                type="co"
                fullWidth
                value={email}
                onChange={(e) => setEmail( e.target.value )}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={() => {
            handleEditClicked();
          }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
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