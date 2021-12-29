
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const CustomerManagement = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleResetClicked= () => {
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleName = (change:any) => {
    setName(change);
  };
  const handleEmail = (change:any) => {
    setEmail(change);
  };
  const handlePhone = (change:any) => {
    setPhone(change);
  };
  return (
    <div>
      <h2>
        Create new Customer.
      </h2>
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
            autoFocus
            margin="dense"
            id="cName"
            label="Customer Name"
            type="name"
            fullWidth
            variant="outlined"
            onChange={(change:any) => handleName(change.target.value)}
            value={name}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            margin="dense"
            id="cPhone"
            label="Customer Phone number"
            type="Phone"
            value={phoneNumber}
            onChange={(change:any) => handlePhone(change.target.value)}
            fullWidth
            variant="outlined"

          />
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
        <DialogTitle>Delete Box</DialogTitle>
        <React.Fragment>
          <DialogContent>
            <Alert severity="warning">Are you sure!</Alert>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Confirm</Button>
          </DialogActions>
        </React.Fragment>
      </Dialog>
    </div>

  );
};

export default CustomerManagement;