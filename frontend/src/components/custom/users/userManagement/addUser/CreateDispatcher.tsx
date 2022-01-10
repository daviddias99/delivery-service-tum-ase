
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, Snackbar,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {AxiosResponse} from 'axios';
import api from '../../../../../services/api';


const CreateDispatcher = () => {
  const [showError, setError] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleResetClicked= () => {
    setFirstName('');
    setUserName('');
    setSurname('');
    setEmail('');
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = () => {
    setSuccess(false);
  };
  const handleError = () => {
    setError(false);
  };
  const confirmClicked = () => {
    const newDispatcher = {username: userName, firstName: firstName, surname: surname, password: 'password', email: email};
    const callback = (response: AxiosResponse<any, any>) => {

      if (response.status !== 200) {
        setError(true);
        setSuccess(false);
        return;
      }
      setError(false);
      setSuccess(true);
      handleResetClicked();
      handleClose();
    };
    api.createDispatcher(newDispatcher, callback);
  };

  return (
    <div>
      <h2>
        Create new Dispatcher.
      </h2>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleError}>
        <Alert severity="error" sx={{ width: '100%' }}>
          This is a error message!
        </Alert>
      </Snackbar>
      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleSuccess}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Customer succesfully added.
        </Alert>
      </Snackbar>
      <p>
        Fill these information to create a new Dispatcher.
      </p>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cId"
            label="Dispatcher ID"
            type="name"
            value={'Will be auto generated for you.'}
            fullWidth
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="cName"
            label="User Name"
            type="name"
            fullWidth
            variant="outlined"
            onChange={(change:any) => setUserName(change.target.value)}
            value={userName}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cName"
            label="First Name"
            type="name"
            fullWidth
            variant="outlined"
            onChange={(change:any) => setFirstName(change.target.value)}
            value={firstName}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cName"
            label="Surname"
            type="name"
            fullWidth
            variant="outlined"
            onChange={(change:any) => setSurname(change.target.value)}
            value={surname}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cEmail"
            label="Dispatcher Email"
            type="email"
            value={email}
            onChange={(change:any) => setEmail(change.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>

      </Grid>
      <Grid sx={{marginTop: '3%'}} >
        <Button variant="contained" color="success" sx={{mr: 6, float: 'right'}} startIcon={<AddIcon />} onClick={handleClickOpen}>
          Create
        </Button>
        <Button variant="contained" color="secondary" sx={{mr: 6, float: 'right'}} startIcon={<DeleteIcon />} onClick={handleResetClicked}>
          Reset
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Box</DialogTitle>
        <React.Fragment>
          <DialogContent>
            <Alert severity="warning">Are you sure!</Alert>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={confirmClicked}>Confirm</Button>
          </DialogActions>
        </React.Fragment>
      </Dialog>
    </div>

  );
};
export default CreateDispatcher;