import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { boxInfo, updateBox } from 'components/box/Box/boxSlice/boxSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from 'types';
import { useState } from 'react';
const EditBox = () => {
  const dispatch = useDispatch();
  const box = useSelector(boxInfo) as Box;
  const [open, setOpen] = useState(false);
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

  const EditClicked = () => {
    // copy the value from the store to change them.
    const newBox = {...box};
    const addressInfo = {...newBox.address};

    newBox.name = name;
    addressInfo.addressLine1 = address;
    addressInfo.addressLine2 = co;
    addressInfo.city = city;
    addressInfo.postalCode = postalCode;
    newBox.address= addressInfo;
    dispatch(updateBox(newBox));
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" style={{ float: 'right'}} endIcon={<EditIcon />} onClick={handleClickOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit box Information</DialogTitle>
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
            EditClicked();
          }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditBox;