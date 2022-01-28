
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {AxiosResponse} from 'axios';
import api from '../../../../../services/api';
import FormControl from '@mui/material/FormControl';


const CreateCustomer = () => {
  const [showError, setError] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [RFID, setRFID] = useState('');
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleResetClicked= () => {
    setFirstName('');
    setSurname('');
    setEmail('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRFID(event.target.value as string);
  };

  const handleError = () => {
    setError(false);
  };
  const handleSuccess = () => {
    setSuccess(false);
  };

  const confirmClicked = () => {
    const newCustomer = { firstName: firstName, surname: surname, password: 'password', email: email, rfId: RFID};
    const callback = (response: AxiosResponse<any, any>) => {

      if (response.status !== 200) {
        setError(true);
        setSuccess(false);
      } else {
        setError(false);
        setSuccess(true);
      }
      handleResetClicked();
      handleClose();
    };
    api.createCustomer(newCustomer, callback);
  };

  const handleEmail = (change:any) => {
    setEmail(change);
  };
  return (
    <div>

      <h2>
        Create new Customer.
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
        Fill these information to create a new Customer.
      </p>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cId"
            label="Customer ID"
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
          <TextField required id="RFID" label="RFID" variant="outlined" fullWidth sx={{width: '100%'}} value={RFID} onChange={e => setRFID(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cEmail"
            label="Customer Email"
            type="email"
            value={email}
            onChange={(change:any) => handleEmail(change.target.value)}
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
        <DialogTitle>Create Customer</DialogTitle>
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

export default CreateCustomer;