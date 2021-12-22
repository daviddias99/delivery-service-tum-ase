import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boxesList, updateBoxes } from 'redux/slices/box/boxesSlice';

import api from 'services/api';

const AddBox = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState(' ');
  const [address, setAdress] = useState(' ');
  const [co, setCo] = useState(' ');
  const [city, setCity] = useState(' ');
  const [postalCode, setPostalCode] = useState(' ');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const list = useSelector(boxesList);
  const dispatch = useDispatch();

  const AddClicked = () => {
    const newBoxData = { name: name, address: { addressLine1: address, addressLine2: co, city: city, postalCode: postalCode } };

    const callback = (data: any, status: number) => {

      if (status !== 200) {
        setError('An error occured and the box was not created');
        return;
      }

      setError('');

      // TODO: remove once backend API is fixed
      dispatch(updateBoxes([...list, {...data, status: 'free'}]));
      handleClose();
    };

    api.createBox(newBoxData, callback);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <Button variant="contained" color="success" sx={{ mr: 6 }} startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add box
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add box</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new box, please fill these information.
            <p style={{ color: 'red' }}>
              {error}
            </p>
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="adress"
                label=" Address"
                type="adress"
                fullWidth
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="co"
                label=" Co"
                type="co"
                fullWidth
                value={co}
                onChange={(e) => setCo(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="city"
                label=" City"
                type="city"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="postalCode"
                label=" Postal Code"
                type="postalCode"
                fullWidth
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            AddClicked();
          }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default AddBox;